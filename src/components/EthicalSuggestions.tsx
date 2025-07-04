
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Brain, RefreshCw, CheckCircle, Lightbulb, ArrowRight } from 'lucide-react';

const EthicalSuggestions = () => {
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      category: 'Language Ethics',
      title: 'Remove Urgency Manipulation',
      description: 'Replace "limited time only" with transparent availability information',
      impact: 'High',
      difficulty: 'Easy',
      before: 'URGENT: Only 3 hours left to claim your discount!',
      after: 'This offer is available until December 31st, 2024',
      accepted: false
    },
    {
      id: 2,
      category: 'Audience Targeting',
      title: 'Avoid Low-Income Over-targeting',
      description: 'Reduce budget allocation to low-income ZIP codes to prevent predatory targeting',
      impact: 'Medium',
      difficulty: 'Medium',
      before: '45% budget allocated to income <$30k segments',
      after: '25% budget allocated to income <$30k segments',
      accepted: false
    },
    {
      id: 3,
      category: 'Data Privacy',
      title: 'Enhance Consent Clarity',
      description: 'Make data collection purposes more explicit in signup forms',
      impact: 'High',
      difficulty: 'Easy',
      before: 'We use your data to improve our services',
      after: 'We use your email to send newsletters and product updates. You can unsubscribe anytime.',
      accepted: true
    },
    {
      id: 4,
      category: 'Accessibility',
      title: 'Improve Visual Accessibility',
      description: 'Increase color contrast for better readability',
      impact: 'Medium',
      difficulty: 'Easy',
      before: 'Light gray text on white background',
      after: 'Dark gray text with 4.5:1 contrast ratio',
      accepted: false
    }
  ]);

  const [customInput, setCustomInput] = useState('');

  const additionalSuggestions = [
    'Consider adding clear opt-out mechanisms for all marketing communications',
    'Review targeting parameters to ensure fair representation across demographics',
    'Implement progressive profiling to reduce form abandonment',
    'Add transparency about how user data influences personalization',
    'Consider frequency capping to prevent ad fatigue',
    'Ensure mobile-first design for accessibility across devices'
  ];

  const handleAcceptSuggestion = (id: number) => {
    setSuggestions(prev => 
      prev.map(suggestion => 
        suggestion.id === id 
          ? { ...suggestion, accepted: !suggestion.accepted }
          : suggestion
      )
    );
  };

  const generateNewSuggestions = () => {
    // In a real app, this would call an AI service
    console.log('Generating new AI suggestions...');
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-900">
            <Brain className="w-6 h-6" />
            <span>AI-Powered Ethical Suggestions</span>
          </CardTitle>
          <CardDescription className="text-green-700">
            GPT-powered recommendations to improve campaign ethics and user experience
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{suggestions.length}</div>
            <div className="text-sm text-slate-600">Total Suggestions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {suggestions.filter(s => s.accepted).length}
            </div>
            <div className="text-sm text-slate-600">Accepted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {suggestions.filter(s => s.impact === 'High').length}
            </div>
            <div className="text-sm text-slate-600">High Impact</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {suggestions.filter(s => s.difficulty === 'Easy').length}
            </div>
            <div className="text-sm text-slate-600">Easy Fixes</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Personalized Ethical Recommendations</CardTitle>
            <CardDescription>AI-generated suggestions based on your campaign analysis</CardDescription>
          </div>
          <Button onClick={generateNewSuggestions} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div 
                key={suggestion.id} 
                className={`p-4 border rounded-lg transition-all ${
                  suggestion.accepted ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-slate-900">{suggestion.title}</h3>
                      {suggestion.accepted && <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                    <p className="text-slate-600 text-sm mb-2">{suggestion.description}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{suggestion.category}</Badge>
                      <Badge className={getImpactColor(suggestion.impact)}>
                        {suggestion.impact} Impact
                      </Badge>
                      <Badge className={getDifficultyColor(suggestion.difficulty)}>
                        {suggestion.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Before/After */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <div className="text-xs font-medium text-red-800 mb-1">BEFORE</div>
                    <div className="text-sm text-red-700">{suggestion.before}</div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded relative">
                    <div className="text-xs font-medium text-green-800 mb-1">AFTER</div>
                    <div className="text-sm text-green-700">{suggestion.after}</div>
                    <ArrowRight className="w-4 h-4 text-slate-400 absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 hidden md:block" />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={suggestion.accepted ? "secondary" : "default"}
                    onClick={() => handleAcceptSuggestion(suggestion.id)}
                    className={suggestion.accepted ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                  >
                    {suggestion.accepted ? 'Accepted' : 'Accept Suggestion'}
                  </Button>
                  <Button size="sm" variant="outline">
                    More Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5" />
            <span>Additional Ethical Considerations</span>
          </CardTitle>
          <CardDescription>General best practices for ethical marketing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {additionalSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span className="text-sm text-slate-700">{suggestion}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Input */}
      <Card>
        <CardHeader>
          <CardTitle>Request Custom Ethical Analysis</CardTitle>
          <CardDescription>Describe your specific scenario for tailored ethical guidance</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe your marketing campaign or ethical concern..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="mb-4"
          />
          <Button className="bg-green-600 hover:bg-green-700">
            <Brain className="w-4 h-4 mr-2" />
            Generate Custom Suggestions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EthicalSuggestions;
