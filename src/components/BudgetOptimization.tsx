// Regenerate Recommendations button now randomizes recommended and roi values.
// 
// Apply Changes button updates current values with recommended.

// BudgetOptimization.tsx
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
import { BarChart3, RefreshCw, TrendingUp } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

// Type Definitions
interface BudgetItem {
  name: string;
  budget: number;
  percentage: number;
  leads: number;
  color: string;
}

interface PerformanceItem {
  segment: string;
  current: number;
  recommended: number;
  roi: number;
}

interface AudienceInsight {
  segment: string;
  size: string;
  engagement: string;
  recommended: boolean;
}

const BudgetOptimization = () => {
  const initialBudgetData: BudgetItem[] = [
    { name: 'High Value', budget: 45000, percentage: 45, leads: 1200, color: '#10b981' },
    { name: 'Medium', budget: 30000, percentage: 30, leads: 800, color: '#3b82f6' },
    { name: 'Low Priority', budget: 15000, percentage: 15, leads: 300, color: '#6b7280' },
    { name: 'Retargeting', budget: 10000, percentage: 10, leads: 150, color: '#f59e0b' }
  ];

  const [performanceData, setPerformanceData] = useState<PerformanceItem[]>([
    { segment: 'High Value', current: 45, recommended: 52, roi: 4.2 },
    { segment: 'Medium', current: 30, recommended: 28, roi: 2.8 },
    { segment: 'Low Priority', current: 15, recommended: 10, roi: 1.4 },
    { segment: 'Retargeting', current: 10, recommended: 10, roi: 3.1 }
  ]);

  const [audienceInsights] = useState<AudienceInsight[]>([
    { segment: 'Tech Professionals', size: '2.5M', engagement: '8.4%', recommended: true },
    { segment: 'Marketing Directors', size: '890K', engagement: '12.1%', recommended: true },
    { segment: 'Small Business Owners', size: '1.8M', engagement: '6.2%', recommended: false },
    { segment: 'Enterprise Decision Makers', size: '450K', engagement: '15.3%', recommended: true }
  ]);

  const regenerateRecommendations = () => {
    const updated = performanceData.map(item => {
      const recommended = Math.max(5, Math.min(60, Math.round(item.current + (Math.random() * 10 - 5))));
      return {
        ...item,
        recommended,
        roi: parseFloat((Math.random() * (5 - 1.2) + 1.2).toFixed(1))
      };
    });
    setPerformanceData(updated);
  };

  const applyChanges = () => {
    const updated = performanceData.map(item => ({
      ...item,
      current: item.recommended
    }));
    setPerformanceData(updated);
  };

  const totalBudget = initialBudgetData.reduce((sum, item) => sum + item.budget, 0);

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Current Budget Allocation</span>
            </CardTitle>
            <CardDescription>Distribution across lead segments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={initialBudgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="budget"
                  >
                    {initialBudgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Budget']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {initialBudgetData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">${item.budget.toLocaleString()}</div>
                    <div className="text-xs text-slate-600">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Optimized budget allocation suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="segment" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#94a3b8" name="Current %" />
                  <Bar dataKey="recommended" fill="#3b82f6" name="Recommended %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={regenerateRecommendations}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate Recommendations
              </Button>
              <Button variant="outline" onClick={applyChanges}>
                Apply Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Segment Performance Analysis</CardTitle>
          <CardDescription>ROI and efficiency metrics by segment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {performanceData.map((segment, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-medium text-slate-900 mb-2">{segment.segment}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Current:</span>
                    <span className="font-medium">{segment.current}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Recommended:</span>
                    <span className="font-medium text-blue-600">{segment.recommended}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">ROI:</span>
                    <span className="font-bold text-green-600">{segment.roi}x</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audience Segments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Audience Segment Recommendations</span>
          </CardTitle>
          <CardDescription>AI-identified high-potential audience segments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audienceInsights.map((audience, index) => (
              <div key={index} className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">{audience.segment}</h4>
                  <div className="text-sm text-slate-600 mt-1">
                    Size: {audience.size} • Engagement: {audience.engagement}
                  </div>
                </div>
                <Badge className={audience.recommended
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : 'bg-gray-100 text-gray-800 border-gray-200'}>
                  {audience.recommended ? 'Recommended' : 'Consider'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetOptimization;