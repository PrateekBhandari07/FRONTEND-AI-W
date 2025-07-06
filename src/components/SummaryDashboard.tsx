
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, TrendingUp, Users, FileCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

const SummaryDashboard = () => {
  const ethicalScore = 87;
  
  const summaryCards = [
    {
      title: "Lead Quality Score",
      value: "94%",
      description: "High-quality leads identified",
      icon: TrendingUp,
      status: "excellent",
      trend: "+12% vs last month"
    },
    {
      title: "Fairness Status",
      value: "Good",
      description: "Bias metrics within limits",
      icon: Shield,
      status: "good",
      trend: "Demographic parity: 0.05"
    },
    {
      title: "Privacy Health",
      value: "Secure",
      description: "GDPR compliant campaigns",
      icon: FileCheck,
      status: "excellent",
      trend: "100% PII protection"
    },
    {
      title: "Compliance Status",
      value: "Pass",
      description: "All regulations met",
      icon: CheckCircle,
      status: "excellent",
      trend: "0 violations detected"
    }
  ];

  const campaignData = [
    { name: 'Email', leads: 2400, ethical: 195 },
    { name: 'Social', leads: 1398, ethical: 588 },
    { name: 'Display', leads: 800, ethical: 92 },
    { name: 'Search', leads: 3008, ethical: 1985 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Ethical Score Hero */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Ethical AI Score</CardTitle>
          <CardDescription className="text-blue-100">
            Overall campaign ethics assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-bold mb-4">{ethicalScore}</div>
          <div className="text-xl mb-4">Excellent Ethical Standing</div>
          <Progress value={ethicalScore} className="w-full max-w-md mx-auto bg-blue-400" />
          <div className="mt-4 flex justify-center space-x-4">
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Export Compliance Report
            </Button>
            <Button variant="outline" className="border-white text-blue-600 hover:bg-white/20">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {card.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{card.value}</div>
                <p className="text-xs text-slate-600 mb-2">{card.description}</p>
                <Badge className={getStatusColor(card.status)}>
                  {card.trend}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance by Channel</CardTitle>
            <CardDescription>Lead generation and ethical scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" fill="#3b82f6" name="Leads Generated" />
                <Bar dataKey="ethical" fill="#10b981" name="Ethical Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Health Monitor</CardTitle>
            <CardDescription>Real-time ethical AI monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Bias Detection: Active</p>
                  <p className="text-xs text-slate-600">Last scan: 2 minutes ago</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Normal</Badge>
              </div>
              
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Privacy Compliance: Monitored</p>
                  <p className="text-xs text-slate-600">GDPR checks: Passed</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Secure</Badge>
              </div>
              
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Dark Pattern Scanner</p>
                  <p className="text-xs text-slate-600">1 minor issue detected</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryDashboard;
