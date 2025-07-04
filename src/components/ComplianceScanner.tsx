
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Upload, AlertTriangle, CheckCircle, Eye, FileText } from 'lucide-react';

const ComplianceScanner = () => {
  const [campaignContent, setCampaignContent] = useState('');
  const [scanComplete, setScanComplete] = useState(false);

  const sampleContent = `🚨 URGENT: Limited Time Offer! 
Only 24 hours left to get 50% OFF!
Join now with your email: john.doe@gmail.com
*Terms and conditions apply (see fine print below)
Click here immediately - offer expires soon!`;

  const scanResults = {
    piiIssues: [
      { type: 'Email Address', content: 'john.doe@gmail.com', severity: 'high', description: 'Personal email exposed in campaign text' },
      { type: 'Phone Number', content: '(555) 123-4567', severity: 'medium', description: 'Phone number found in footer text' }
    ],
    gdprIssues: [
      { type: 'Missing Consent', content: 'Email collection without clear consent', severity: 'high', description: 'No explicit consent mechanism provided' },
      { type: 'Data Processing', content: 'Unclear data usage statement', severity: 'medium', description: 'Purpose of data collection not clearly stated' }
    ],
    darkPatterns: [
      { type: 'False Urgency', content: 'Only 24 hours left!', severity: 'high', description: 'Creates artificial time pressure' },
      { type: 'Hidden Terms', content: 'Terms in fine print', severity: 'medium', description: 'Important terms not prominently displayed' },
      { type: 'Forced Action', content: 'Click here immediately', severity: 'medium', description: 'Pressures immediate action' }
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'low': return <Eye className="w-4 h-4 text-blue-600" />;
      default: return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  const handleScan = () => {
    setScanComplete(true);
  };

  const totalIssues = scanResults.piiIssues.length + scanResults.gdprIssues.length + scanResults.darkPatterns.length;
  const highSeverityIssues = [...scanResults.piiIssues, ...scanResults.gdprIssues, ...scanResults.darkPatterns]
    .filter(issue => issue.severity === 'high').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-900">
            <Shield className="w-6 h-6" />
            <span>Compliance & Dark Pattern Scanner</span>
          </CardTitle>
          <CardDescription className="text-blue-700">
            Analyze campaign content for privacy violations, GDPR compliance, and dark patterns
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Campaign Content Input</span>
            </CardTitle>
            <CardDescription>Paste your email or ad content for analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter your campaign content here..."
              value={campaignContent}
              onChange={(e) => setCampaignContent(e.target.value)}
              className="min-h-32 mb-4"
            />
            <div className="flex space-x-2">
              <Button onClick={handleScan} className="bg-blue-600 hover:bg-blue-700">
                <Shield className="w-4 h-4 mr-2" />
                Scan Content
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCampaignContent(sampleContent)}
              >
                Use Sample
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>File Upload Scanner</CardTitle>
            <CardDescription>Upload campaign files for batch analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 mb-2">Drop files here or click to browse</p>
              <p className="text-xs text-slate-500">Supports .txt, .html, .docx files up to 10MB</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {scanComplete && (
        <>
          {/* Scan Results Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Scan Results Summary</CardTitle>
              <CardDescription>Compliance and privacy analysis results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{totalIssues}</div>
                  <div className="text-sm text-red-800">Total Issues</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{highSeverityIssues}</div>
                  <div className="text-sm text-yellow-800">High Severity</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-blue-800">Categories</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2 min</div>
                  <div className="text-sm text-green-800">Scan Time</div>
                </div>
              </div>

              {highSeverityIssues > 0 && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription>
                    <strong>Critical Issues Found:</strong> {highSeverityIssues} high-severity compliance violations detected. Immediate action recommended.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <div className="space-y-6">
            {/* PII Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-red-600" />
                  <span>Personal Information (PII) Detection</span>
                  <Badge className="bg-red-100 text-red-800">{scanResults.piiIssues.length} issues</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scanResults.piiIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getSeverityIcon(issue.severity)}
                        <div>
                          <div className="font-medium text-slate-900">{issue.type}</div>
                          <div className="text-sm text-slate-600">"{issue.content}"</div>
                          <div className="text-xs text-slate-500">{issue.description}</div>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(issue.severity)}>
                        {issue.severity.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* GDPR Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>GDPR Compliance Issues</span>
                  <Badge className="bg-blue-100 text-blue-800">{scanResults.gdprIssues.length} issues</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scanResults.gdprIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getSeverityIcon(issue.severity)}
                        <div>
                          <div className="font-medium text-slate-900">{issue.type}</div>
                          <div className="text-sm text-slate-600">"{issue.content}"</div>
                          <div className="text-xs text-slate-500">{issue.description}</div>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(issue.severity)}>
                        {issue.severity.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dark Patterns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span>Dark Pattern Detection</span>
                  <Badge className="bg-yellow-100 text-yellow-800">{scanResults.darkPatterns.length} patterns</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scanResults.darkPatterns.map((pattern, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getSeverityIcon(pattern.severity)}
                        <div>
                          <div className="font-medium text-slate-900">{pattern.type}</div>
                          <div className="text-sm text-slate-600">"{pattern.content}"</div>
                          <div className="text-xs text-slate-500">{pattern.description}</div>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(pattern.severity)}>
                        {pattern.severity.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default ComplianceScanner;
