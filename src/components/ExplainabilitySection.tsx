
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ExplainabilitySection = () => {
  const shapData = [
    { feature: 'Email Open Rate', impact: 0.45, direction: 'positive' },
    { feature: 'Website Engagement', impact: 0.38, direction: 'positive' },
    { feature: 'Purchase History', impact: 0.32, direction: 'positive' },
    { feature: 'Age Group', impact: -0.28, direction: 'negative' },
    { feature: 'Geographic Location', impact: 0.25, direction: 'positive' },
    { feature: 'Social Media Activity', impact: 0.22, direction: 'positive' },
    { feature: 'Time on Site', impact: -0.18, direction: 'negative' },
    { feature: 'Device Type', impact: 0.15, direction: 'positive' }
  ];

  const explanationCards = [
    {
      title: "High Lead Score Drivers",
      items: [
        { feature: "Email Open Rate", value: "85%", impact: "Increased score by +0.23" },
        { feature: "Previous Purchases", value: "3 orders", impact: "Increased score by +0.19" },
        { feature: "Website Sessions", value: "12/month", impact: "Increased score by +0.15" }
      ]
    },
    {
      title: "Score Reduction Factors",
      items: [
        { feature: "Account Age", value: "< 30 days", impact: "Decreased score by -0.12" },
        { feature: "Mobile Usage", value: "Only mobile", impact: "Decreased score by -0.08" },
        { feature: "Geographic Risk", value: "Low-conversion area", impact: "Decreased score by -0.05" }
      ]
    }
  ];

  const microExplanations = [
    {
      change: "Email Open Rate ↑",
      description: "Higher than average open rate increased lead score",
      impact: "+15%",
      confidence: 0.87
    },
    {
      change: "Purchase Frequency ↑", 
      description: "Multiple recent purchases indicate high engagement",
      impact: "+12%",
      confidence: 0.91
    },
    {
      change: "Time Since Last Visit ↓",
      description: "Recent activity suggests active interest",
      impact: "+8%",
      confidence: 0.76
    },
    {
      change: "Age Demographic ↓",
      description: "Age group shows lower conversion historically",
      impact: "-6%",
      confidence: 0.82
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-900">
            <Eye className="w-6 h-6" />
            <span>Why did the model make this decision?</span>
          </CardTitle>
          <CardDescription className="text-purple-700">
            Explainable AI insights showing which features most influenced the lead scoring predictions
          </CardDescription>
        </CardHeader>
      </Card>

      {/* SHAP Summary Plot */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Importance Analysis (SHAP)</CardTitle>
          <CardDescription>
            Global feature importance showing impact on model predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={shapData}
                layout="horizontal"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[-0.5, 0.5]} />
                <YAxis dataKey="feature" type="category" width={100} />
                <Tooltip 
                  formatter={(value) => [
                    `${Number(value) > 0 ? '+' : ''}${(Number(value) * 100).toFixed(1)}%`,
                    'Impact on Score'
                  ]}
                />
                <Bar dataKey="impact">
                  {shapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.direction === 'positive' ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Explanation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {explanationCards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {card.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900">{item.feature}</div>
                      <div className="text-sm text-slate-600">{item.value}</div>
                    </div>
                    <Badge className={item.impact.startsWith('+') ? 
                      'bg-green-100 text-green-800 border-green-200' : 
                      'bg-red-100 text-red-800 border-red-200'
                    }>
                      {item.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Micro-explanations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="w-5 h-5" />
            <span>Detailed Decision Explanations</span>
          </CardTitle>
          <CardDescription>
            Step-by-step breakdown of how individual features affected predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {microExplanations.map((explanation, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {explanation.impact.startsWith('+') ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium text-slate-900">{explanation.change}</span>
                  </div>
                  <span className="text-slate-600">{explanation.description}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={explanation.impact.startsWith('+') ? 
                    'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }>
                    {explanation.impact}
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm text-slate-600">Confidence</div>
                    <Progress value={explanation.confidence * 100} className="w-16 h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExplainabilitySection;
