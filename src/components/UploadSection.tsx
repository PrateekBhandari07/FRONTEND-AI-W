
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, FileCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const UploadSection = () => {
  const [uploadedFile, setUploadedFile] = useState(false);
  
  const sampleData = [
    { id: 'U001', email: 'john@example.com', age: 28, location: 'NY', engagement: 0.85 },
    { id: 'U002', email: 'sarah@example.com', age: 34, location: 'CA', engagement: 0.72 },
    { id: 'U003', email: 'mike@example.com', age: 41, location: 'TX', engagement: 0.91 },
    { id: 'U004', email: 'emma@example.com', age: 29, location: 'FL', engagement: 0.68 },
    { id: 'U005', email: 'david@example.com', age: 37, location: 'WA', engagement: 0.79 }
  ];

  const validationResults = {
    totalRows: 15847,
    missingValues: 23,
    duplicateRows: 5,
    validEmails: 98.2,
    dataQuality: 'Good'
  };

  const handleFileUpload = () => {
    setUploadedFile(true);
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
                <Button onClick={handleFileUpload} className="bg-blue-600 hover:bg-blue-700">
                  Choose File
                </Button>
                <Button variant="outline">
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
                  File uploaded successfully! Processing data for ethical AI analysis...
                </AlertDescription>
              </Alert>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-green-600" />
                  <span className="font-medium">marketing_dataset.csv</span>
                  <Badge className="bg-green-100 text-green-800">Processed</Badge>
                </div>
                <Button variant="outline" size="sm">Replace File</Button>
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
              <CardDescription>First 5 rows of your uploaded dataset</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Engagement Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.id}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>
                          <Badge variant={row.engagement > 0.8 ? "default" : "secondary"}>
                            {row.engagement}
                          </Badge>
                        </TableCell>
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
                <Button variant="outline">
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
