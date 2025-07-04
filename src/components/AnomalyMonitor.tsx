
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, TrendingUp, Activity, Bell, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AnomalyMonitor = () => {
  const alerts = [
    {
      id: 1,
      type: 'Budget Allocation',
      severity: 'critical',
      message: 'High-value segment receiving 87% of total budget',
      description: 'Unusual concentration may indicate targeting bias',
      timestamp: '5 minutes ago',
      metric: 87,
      threshold: 60
    },
    {
      id: 2,
      type: 'Conversion Rate',
      severity: 'warning',
      message: 'Sudden spike in mobile conversions (+340%)',
      description: 'Investigate potential bot traffic or campaign changes',
      timestamp: '12 minutes ago',
      metric: 340,
      threshold: 150
    },
    {
      id: 3,
      type: 'Demographic Targeting',
      severity: 'caution',
      message: 'Low representation in 45-55 age group',
      description: 'Age group receiving only 8% of impressions vs 25% population',
      timestamp: '1 hour ago',
      metric: 8,
      threshold: 15
    }
  ];

  const budgetTrendData = [
    { time: '00:00', highValue: 45, medium: 30, lowPriority: 25 },
    { time: '04:00', highValue: 48, medium: 28, lowPriority: 24 },
    { time: '08:00', highValue: 52, medium: 26, lowPriority: 22 },
    { time: '12:00', highValue: 65, medium: 20, lowPriority: 15 },
    { time: '16:00', highValue: 78, medium: 15, lowPriority: 7 },
    { time: '20:00', highValue: 87, medium: 10, lowPriority: 3 }
  ];

  const performanceData = [
    { time: '00:00', ctr: 2.1, cpc: 1.2, conversions: 45 },
    { time: '04:00', ctr: 2.3, cpc: 1.1, conversions: 52 },
    { time: '08:00', ctr: 2.8, cpc: 0.9, conversions: 67 },
    { time: '12:00', ctr: 3.2, cpc: 0.8, conversions: 89 },
    { time: '16:00', ctr: 4.1, cpc: 0.7, conversions: 156 },
    { time: '20:00', ctr: 5.8, cpc: 0.6, conversions: 234 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'caution': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'caution': return <Activity className="w-5 h-5 text-blue-600" />;
      default: return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  const systemHealth = {
    overall: 'good',
    biasDetection: 'active', 
    privacyCompliance: 'monitored',
    darkPatternScanner: 'warning'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-900">
            <AlertTriangle className="w-6 h-6" />
            <span>Anomaly Detection Monitor</span>
          </CardTitle>
          <CardDescription className="text-orange-700">
            Real-time monitoring of unusual patterns in campaign behavior and ethical metrics
          </CardDescription>
        </CardHeader>
      </Card>

      {/* System Status Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600">System Health</div>
                <div className="text-lg font-bold text-green-600">Good</div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600">Active Alerts</div>
                <div className="text-lg font-bold text-red-600">{alerts.length}</div>
              </div>
              <Bell className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600">Critical Issues</div>
                <div className="text-lg font-bold text-red-600">
                  {alerts.filter(a => a.severity === 'critical').length}
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600">Last Scan</div>
                <div className="text-lg font-bold text-slate-900">2m ago</div>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Active Anomaly Alerts</span>
          </CardTitle>
          <CardDescription>Real-time alerts for unusual campaign behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getSeverityIcon(alert.severity)}
                    <div>
                      <h4 className="font-medium text-slate-900">{alert.message}</h4>
                      <p className="text-sm text-slate-600">{alert.description}</p>
                      <p className="text-xs text-slate-500 mt-1">{alert.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Investigate
                    </Button>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Current Value:</span>
                    <span className="font-medium">{alert.metric}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Threshold:</span>
                    <span className="font-medium">{alert.threshold}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Deviation:</span>
                    <span className={`font-medium ${alert.metric > alert.threshold ? 'text-red-600' : 'text-green-600'}`}>
                      {alert.metric > alert.threshold ? '+' : ''}{alert.metric - alert.threshold}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trend Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Allocation Trends</CardTitle>
            <CardDescription>24-hour budget distribution anomaly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={budgetTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="highValue" 
                    stackId="1" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    name="High Value"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="medium" 
                    stackId="1" 
                    stroke="#3b82f6" 
                    fill="#3b82f6"
                    name="Medium"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="lowPriority" 
                    stackId="1" 
                    stroke="#6b7280" 
                    fill="#6b7280"
                    name="Low Priority"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Spikes</CardTitle>
            <CardDescription>Unusual activity in campaign metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Conversions"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ctr" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="CTR"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health Details */}
      <Card>
        <CardHeader>
          <CardTitle>Ethical AI Monitoring Systems</CardTitle>
          <CardDescription>Status of all ethical monitoring components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Bias Detection</h4>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-slate-600 mb-2">Demographic monitoring active</p>
              <Badge className="bg-green-100 text-green-800">Normal</Badge>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Privacy Compliance</h4>
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-slate-600 mb-2">GDPR checks passed</p>
              <Badge className="bg-blue-100 text-blue-800">Secure</Badge>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Dark Pattern Scanner</h4>
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-sm text-slate-600 mb-2">1 minor issue detected</p>
              <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Anomaly Detection</h4>
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-slate-600 mb-2">Real-time monitoring</p>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnomalyMonitor;
