// UploadSection.tsx
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Upload,
  FileCheck,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import {
  Alert,
  AlertDescription
} from '@/components/ui/alert';

const computeValidationResults = (data: any[]) => {
  const totalRows = data.length;
  let missingValues = 0;
  const seenRows = new Set();
  let duplicateRows = 0;
  let validEmailCount = 0;

  for (const row of data) {
    const rowString = JSON.stringify(row);
    if (seenRows.has(rowString)) {
      duplicateRows += 1;
    } else {
      seenRows.add(rowString);
    }

    for (const value of Object.values(row)) {
      if (value === null || value === '' || value === undefined) {
        missingValues += 1;
      }
    }

    if ('email' in row) {
      const email = row.email;
      if (typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        validEmailCount += 1;
      }
    }
  }

  const validEmails = totalRows > 0 ? ((validEmailCount / totalRows) * 100).toFixed(1) : '0.0';

  return {
    totalRows,
    missingValues,
    duplicateRows,
    validEmails,
    dataQuality:
      missingValues === 0 && duplicateRows === 0 && parseFloat(validEmails) >= 95
        ? 'Excellent'
        : parseFloat(validEmails) >= 80
        ? 'Good'
        : 'Poor'
  };
};

const UploadSection = () => {
  const [uploadedFile, setUploadedFile] = useState(false);
  const [dataSource, setDataSource] = useState<'file' | 'sample' | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [validationResults, setValidationResults] = useState({
    totalRows: 0,
    missingValues: 0,
    duplicateRows: 0,
    validEmails: '0.0',
    dataQuality: ''
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.error) {
        console.error("Upload error:", data.error);
        return;
      }

      setUploadedFile(true);
      setDataSource("file");
      setPreviewData(data.sample);
      setColumns(data.columns);
      setValidationResults(computeValidationResults(data.fullData));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleUseSampleData = () => {
    setUploadedFile(true);
    setDataSource("sample");

    const sampleData = [
      { id: 'U001', email: 'john@example.com', age: 28, location: 'NY', engagement: 0.85 },
      { id: 'U002', email: 'sarah@example.com', age: 34, location: 'CA', engagement: 0.72 },
      { id: 'U003', email: 'mike@example.com', age: 41, location: 'TX', engagement: 0.91 },
      { id: 'U004', email: 'emma@example.com', age: 29, location: 'FL', engagement: 0.68 },
      { id: 'U005', email: 'david@example.com', age: 37, location: 'WA', engagement: 0.79 }
    ];
    const sampleColumns = Object.keys(sampleData[0]);

    setPreviewData(sampleData);
    setColumns(sampleColumns);
    setValidationResults(computeValidationResults(sampleData));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Marketing Dataset</span>
          </CardTitle>
          <CardDescription>
            Import your marketing data in CSV or JSON format for ethical AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!uploadedFile ? (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Upload your dataset</h3>
              <p className="text-slate-600 mb-4">Drag and drop your CSV or JSON file here, or click to browse</p>
              <div className="flex justify-center space-x-4">
                <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">
                  Choose File
                  <input type="file" accept=".csv,.json" onChange={handleFileUpload} hidden />
                </label>
                <Button variant="outline" onClick={handleUseSampleData}>
                  Use Sample Data
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                Supports CSV, JSON files up to 100MB. Ensure your data includes user IDs and relevant features.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  {dataSource === 'file'
                    ? 'File uploaded successfully! Processing data for ethical AI analysis...'
                    : 'Sample data loaded successfully! Ready for ethical AI analysis...'}
                </AlertDescription>
              </Alert>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-green-600" />
                  <span className="font-medium">
                    {dataSource === 'file' ? 'uploaded_dataset.csv' : 'sample_dataset.csv'}
                  </span>
                  <Badge className="bg-green-100 text-green-800">Processed</Badge>
                </div>
                <Button variant="outline" size="sm" onClick={() => setUploadedFile(false)}>Replace File</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {uploadedFile && (
        <>
          {/* Data Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Data Preview</CardTitle>
              <CardDescription>
                {dataSource === 'file'
                  ? 'First 5 rows of your uploaded dataset'
                  : 'Sample dataset for demonstration'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-auto max-h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((col) => (
                        <TableHead key={col}>{col}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((row, idx) => (
                      <TableRow key={idx}>
                        {columns.map((col) => (
                          <TableCell key={col}>{row[col]}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Validation Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Data Validation Summary</span>
              </CardTitle>
              <CardDescription>Quality assessment of your uploaded dataset</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{validationResults.totalRows.toLocaleString()}</div>
                  <div className="text-sm text-slate-600">Total Rows</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{validationResults.missingValues}</div>
                  <div className="text-sm text-slate-600">Missing Values</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{validationResults.duplicateRows}</div>
                  <div className="text-sm text-slate-600">Duplicate Rows</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{validationResults.validEmails}%</div>
                  <div className="text-sm text-slate-600">Valid Emails</div>
                </div>
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                    {validationResults.dataQuality}
                  </Badge>
                  <div className="text-sm text-slate-600 mt-1">Data Quality</div>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Proceed to Analysis
                </Button>
                <Button variant="outline" onClick={() => setUploadedFile(false)}>
                  Clean Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default UploadSection;