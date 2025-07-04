
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Scale, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const BiasReport = () => {
  const biasMetrics = [
    { metric: 'Demographic Parity', value: 0.05, threshold: 0.1, status: 'good', description: 'Prediction rates similar across groups' },
    { metric: 'Equal Opportunity', value: 0.08, threshold: 0.1, status: 'good', description: 'True positive rates balanced' },
    { metric: 'Calibration', value: 0.12, threshold: 0.15, status: 'warning', description: 'Score distribution slightly skewed' },
    { metric: 'Individual Fairness', value: 0.03, threshold: 0.05, status: 'excellent', description: 'Similar individuals scored similarly' }
  ];

  const demographicData = [
    { group: 'Male 25-35', predictions: 0.78, actualRate: 0.76, gap: 0.02 },
    { group: 'Female 25-35', predictions: 0.74, actualRate: 0.75, gap: -0.01 },
    { group: 'Male 35-45', predictions: 0.82, actualRate: 0.79, gap: 0.03 },
    { group: 'Female 35-45', predictions: 0.77, actualRate: 0.78, gap: -0.01 },
    { group: 'Other', predictions: 0.75, actualRate: 0.76, gap: -0.01 }
  ];

  const intersectionalData = [
    { category: 'Gender', maxGap: 0.04, groups: 'Male vs Female' },
    { category: 'Age Group', maxGap: 0.06, groups: '25-35 vs 45-55' },
    { category: 'Location', maxGap: 0.03, groups: 'Urban vs Rural' },
    { category: 'Income Level', maxGap: 0.08, groups: 'High vs Low' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-900">
            <Scale className="w-6 h-6" />
            <span>Bias & Fairness Assessment</span>
          </CardTitle>
          <CardDescription className="text-purple-700">
            Comprehensive analysis of algorithmic fairness across demographic groups
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Fairness Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {biasMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-slate-900">{metric.metric}</h3>
                {getStatusIcon(metric.status)}
              </div>
              <div className="text-2xl font-bold mb-2">
                {metric.value.toFixed(3)}
              </div>
              <div className="text-xs text-slate-600 mb-3">
                Threshold: {metric.threshold.toFixed(3)}
              </div>
              <Progress 
                value={(metric.value / metric.threshold) * 100} 
                className="mb-2"
              />
              <Badge className={getStatusColor(metric.status)}>
                {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
              </Badge>
              <p className="text-xs text-slate-600 mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Demographic Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction Rates by Demographic Groups</CardTitle>
          <CardDescription>
            Comparison of model predictions vs actual conversion rates across different groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demographicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" />
                <YAxis domain={[0, 1]} />
                <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, '']} />
                <Bar dataKey="predictions" fill="#3b82f6" name="Model Predictions" />
                <Bar dataKey="actualRate" fill="#10b981" name="Actual Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Gap Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {demographicData.map((group, index) => (
              <div key={index} className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="font-medium text-slate-900 text-sm mb-1">{group.group}</div>
                <div className={`text-lg font-bold ${Math.abs(group.gap) > 0.05 ? 'text-red-600' : 'text-green-600'}`}>
                  {group.gap > 0 ? '+' : ''}{(group.gap * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-slate-600">Gap</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Intersectional Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Intersectional Bias Analysis</CardTitle>
          <CardDescription>
            Maximum prediction gaps found within demographic categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {intersectionalData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium text-slate-900">{item.category}</div>
                  <div className="text-sm text-slate-600">{item.groups}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`text-lg font-bold ${item.maxGap > 0.05 ? 'text-red-600' : 'text-green-600'}`}>
                      {(item.maxGap * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-slate-600">Max Gap</div>
                  </div>
                  <Badge className={item.maxGap > 0.05 ? 
                    'bg-red-100 text-red-800 border-red-200' : 
                    'bg-green-100 text-green-800 border-green-200'
                  }>
                    {item.maxGap > 0.05 ? 'Review' : 'OK'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts and Recommendations */}
      <div className="space-y-4">
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Good:</strong> Demographic parity and equal opportunity metrics are within acceptable thresholds.
          </AlertDescription>
        </Alert>
        
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            <strong>Minor Issue:</strong> Calibration metric shows slight deviation. Consider rebalancing training data or adjusting decision thresholds.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default BiasReport;
