
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Shield, BarChart3, AlertTriangle, Scale, Eye, Brain, TrendingUp, FileCheck } from 'lucide-react';
import UploadSection from '@/components/UploadSection';
import LeadScoringModule from '@/components/LeadScoringModule';
import BudgetOptimization from '@/components/BudgetOptimization';
import ExplainabilitySection from '@/components/ExplainabilitySection';
import BiasReport from '@/components/BiasReport';
import ComplianceScanner from '@/components/ComplianceScanner';
import EthicalSuggestions from '@/components/EthicalSuggestions';
import AnomalyMonitor from '@/components/AnomalyMonitor';
import SummaryDashboard from '@/components/SummaryDashboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('summary');

  const tabConfig = [
    { id: 'summary', label: 'Summary', icon: BarChart3 },
    { id: 'upload', label: 'Upload Data', icon: Upload },
    { id: 'scoring', label: 'Lead Scoring', icon: TrendingUp },
    { id: 'budget', label: 'Budget Optimization', icon: BarChart3 },
    { id: 'explainability', label: 'AI Explainability', icon: Eye },
    { id: 'bias', label: 'Bias & Fairness', icon: Scale },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'ethics', label: 'Ethical AI', icon: Brain },
    { id: 'anomalies', label: 'Anomaly Detection', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">TrustPilot</h1>
                <p className="text-sm text-slate-600">Ethical AI Marketing Platform</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Ethical AI Certified
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 mb-8 bg-white/50 backdrop-blur-sm">
            {tabConfig.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col items-center space-y-1 p-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium hidden sm:block">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tab Content */}
          <div className="space-y-6">
            <TabsContent value="summary" className="mt-0">
              <SummaryDashboard />
            </TabsContent>

            <TabsContent value="upload" className="mt-0">
              <UploadSection />
            </TabsContent>

            <TabsContent value="scoring" className="mt-0">
              <LeadScoringModule />
            </TabsContent>

            <TabsContent value="budget" className="mt-0">
              <BudgetOptimization />
            </TabsContent>

            <TabsContent value="explainability" className="mt-0">
              <ExplainabilitySection />
            </TabsContent>

            <TabsContent value="bias" className="mt-0">
              <BiasReport />
            </TabsContent>

            <TabsContent value="compliance" className="mt-0">
              <ComplianceScanner />
            </TabsContent>

            <TabsContent value="ethics" className="mt-0">
              <EthicalSuggestions />
            </TabsContent>

            <TabsContent value="anomalies" className="mt-0">
              <AnomalyMonitor />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white/80 backdrop-blur-sm border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-slate-600">
            Built for Epsilon Hackathon 2025 – Ethical AI Marketing Platform
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
