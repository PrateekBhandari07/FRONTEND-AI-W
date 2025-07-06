
import { useState } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { TrendingUp, Download, Filter } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

const LeadScoringModule = () => {
  const [filterSegment, setFilterSegment] = useState<string | null>(null);

  const leadData = [
    { id: 'U001', score: 0.92, segment: 'High Value', confidence: 0.87, email: 'john@example.com' },
    { id: 'U002', score: 0.78, segment: 'Medium', confidence: 0.82, email: 'sarah@example.com' },
    { id: 'U003', score: 0.95, segment: 'High Value', confidence: 0.91, email: 'mike@example.com' },
    { id: 'U004', score: 0.45, segment: 'Low Priority', confidence: 0.76, email: 'emma@example.com' },
    { id: 'U005', score: 0.83, segment: 'Medium', confidence: 0.85, email: 'david@example.com' },
    { id: 'U006', score: 0.67, segment: 'Medium', confidence: 0.79, email: 'lisa@example.com' },
    { id: 'U007', score: 0.89, segment: 'High Value', confidence: 0.88, email: 'alex@example.com' },
    { id: 'U008', score: 0.34, segment: 'Low Priority', confidence: 0.72, email: 'maria@example.com' }
  ];

  const filteredData = filterSegment
    ? leadData.filter((lead) => lead.segment === filterSegment)
    : leadData;

  const getScoreBadge = (score: number) => {
    if (score >= 0.8) return { color: 'bg-green-100 text-green-800 border-green-200', label: 'High' };
    if (score >= 0.6) return { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Medium' };
    return { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Low' };
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'High Value': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Low Priority': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const downloadCSV = () => {
    const headers = ['User ID', 'Email', 'Lead Score', 'Score Level', 'Segment', 'Confidence'];
    const rows = filteredData.map(lead => {
      const scoreLevel = getScoreBadge(lead.score).label;
      return [
        lead.id,
        lead.email,
        (lead.score * 100).toFixed(0) + '%',
        scoreLevel,
        lead.segment,
        (lead.confidence * 100).toFixed(0) + '%'
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'LeadScoringResults.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const stats = {
    highValue: leadData.filter(lead => lead.segment === 'High Value').length,
    medium: leadData.filter(lead => lead.segment === 'Medium').length,
    lowPriority: leadData.filter(lead => lead.segment === 'Low Priority').length,
    avgScore: (leadData.reduce((sum, lead) => sum + lead.score, 0) / leadData.length).toFixed(2),
    avgConfidence: (leadData.reduce((sum, lead) => sum + lead.confidence, 0) / leadData.length).toFixed(2)
  };

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card><CardContent className="p-4"><div className="text-2xl font-bold text-green-600">{stats.highValue}</div><div className="text-sm text-slate-600">High Value Leads</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-2xl font-bold text-blue-600">{stats.medium}</div><div className="text-sm text-slate-600">Medium Leads</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-2xl font-bold text-slate-600">{stats.lowPriority}</div><div className="text-sm text-slate-600">Low Priority</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-2xl font-bold text-slate-900">{stats.avgScore}</div><div className="text-sm text-slate-600">Avg Score</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-2xl font-bold text-slate-900">{stats.avgConfidence}</div><div className="text-sm text-slate-600">Avg Confidence</div></CardContent></Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Lead Scoring Results</span>
              </CardTitle>
              <CardDescription>AI-predicted lead scores with confidence intervals and segmentation</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    {filterSegment ? filterSegment : 'Filter'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2">
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setFilterSegment(null)}>All</Button>
                    <Separator />
                    <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setFilterSegment('High Value')}>High Value</Button>
                    <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setFilterSegment('Medium')}>Medium</Button>
                    <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setFilterSegment('Low Priority')}>Low Priority</Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={downloadCSV}>
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Lead Score</TableHead>
                  <TableHead>Score Level</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Confidence Bar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((lead) => {
                  const scoreBadge = getScoreBadge(lead.score);
                  return (
                    <TableRow key={lead.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{lead.id}</TableCell>
                      <TableCell className="text-slate-600">{lead.email}</TableCell>
                      <TableCell>
                        <span className="font-bold text-lg">{(lead.score * 100).toFixed(0)}%</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={scoreBadge.color}>{scoreBadge.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSegmentColor(lead.segment)}>{lead.segment}</Badge>
                      </TableCell>
                      <TableCell>{(lead.confidence * 100).toFixed(0)}%</TableCell>
                      <TableCell>
                        <div className="w-20">
                          <Progress value={lead.confidence * 100} className="h-2" />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex justify-between items-center text-sm text-slate-600">
            <span>Showing {filteredData.length} of {leadData.length} leads</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadScoringModule;