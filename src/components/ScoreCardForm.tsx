
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Calendar, MapPin, Send, Save } from 'lucide-react';
import ParameterSection from './ParameterSection';
import { inspectionParameters, FormData, ParameterScore } from '../data/inspectionData';

const ScoreCardForm = () => {
  const [formData, setFormData] = useState<FormData>({
    stationName: '',
    inspectionDate: '',
    inspectorName: '',
    scores: {},
    remarks: {},
    totalScore: 0
  });

  const [activeTab, setActiveTab] = useState('basic-info');

  const handleBasicInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScoreChange = (parameterId: string, score: number) => {
    setFormData(prev => {
      const newScores = { ...prev.scores, [parameterId]: score };
      const totalScore = Object.values(newScores).reduce((sum: number, score: number) => sum + score, 0);
      
      return {
        ...prev,
        scores: newScores,
        totalScore
      };
    });
  };

  const handleRemarksChange = (parameterId: string, remarks: string) => {
    setFormData(prev => ({
      ...prev,
      remarks: { ...prev.remarks, [parameterId]: remarks }
    }));
  };

  const handleSave = () => {
    localStorage.setItem('scoreCardData', JSON.stringify(formData));
    toast.success('Form data saved locally!');
  };

  const handleSubmit = async () => {
    if (!formData.stationName || !formData.inspectionDate || !formData.inspectorName) {
      toast.error('Please fill in all basic information fields');
      return;
    }

    const incompleteParams = inspectionParameters.filter(param => 
      formData.scores[param.id] === undefined
    );

    if (incompleteParams.length > 0) {
      toast.error(`Please score all parameters. Missing: ${incompleteParams.length} items`);
      return;
    }

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submissionTime: new Date().toISOString(),
          maxPossibleScore: inspectionParameters.length * 10
        }),
      });

      if (response.ok) {
        toast.success('Score card submitted successfully!');
        // Clear form after successful submission
        setFormData({
          stationName: '',
          inspectionDate: '',
          inspectorName: '',
          scores: {},
          remarks: {},
          totalScore: 0
        });
        localStorage.removeItem('scoreCardData');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast.error('Failed to submit score card. Please try again.');
    }
  };

  // Load saved data on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('scoreCardData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        toast.info('Previously saved data loaded');
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const completionPercentage = Math.round(
    (Object.keys(formData.scores).length / inspectionParameters.length) * 100
  );

  const maxPossibleScore = inspectionParameters.length * 10;
  const scorePercentage = maxPossibleScore > 0 ? Math.round((formData.totalScore / maxPossibleScore) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Station Cleanliness Inspection Score Card
          </CardTitle>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm opacity-90">
              Progress: {completionPercentage}% Complete
            </div>
            <div className="flex gap-4 text-sm">
              <span>Score: {formData.totalScore}/{maxPossibleScore}</span>
              <span>({scorePercentage}%)</span>
            </div>
          </div>
          <div className="w-full bg-blue-800 rounded-full h-2 mt-2">
            <div 
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-14 bg-gray-50 rounded-none">
              <TabsTrigger value="basic-info" className="text-sm font-medium">
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="platform-areas" className="text-sm font-medium">
                Platform Areas
              </TabsTrigger>
              <TabsTrigger value="facilities" className="text-sm font-medium">
                Facilities
              </TabsTrigger>
              <TabsTrigger value="submission" className="text-sm font-medium">
                Review & Submit
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic-info" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stationName" className="text-base font-medium">
                    Station Name *
                  </Label>
                  <Input
                    id="stationName"
                    placeholder="Enter station name"
                    value={formData.stationName}
                    onChange={(e) => handleBasicInfoChange('stationName', e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inspectionDate" className="text-base font-medium">
                    Inspection Date *
                  </Label>
                  <div className="relative">
                    <Input
                      id="inspectionDate"
                      type="date"
                      value={formData.inspectionDate}
                      onChange={(e) => handleBasicInfoChange('inspectionDate', e.target.value)}
                      className="h-12 text-base pl-10"
                    />
                    <Calendar className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="inspectorName" className="text-base font-medium">
                    Inspector Name *
                  </Label>
                  <Input
                    id="inspectorName"
                    placeholder="Enter inspector name"
                    value={formData.inspectorName}
                    onChange={(e) => handleBasicInfoChange('inspectorName', e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="platform-areas" className="p-6">
              <ParameterSection
                title="Platform Areas Inspection"
                parameters={inspectionParameters.filter(p => p.category === 'platform')}
                scores={formData.scores}
                remarks={formData.remarks}
                onScoreChange={handleScoreChange}
                onRemarksChange={handleRemarksChange}
              />
            </TabsContent>

            <TabsContent value="facilities" className="p-6">
              <ParameterSection
                title="Facilities & Amenities Inspection"
                parameters={inspectionParameters.filter(p => p.category === 'facilities')}
                scores={formData.scores}
                remarks={formData.remarks}
                onScoreChange={handleScoreChange}
                onRemarksChange={handleRemarksChange}
              />
            </TabsContent>

            <TabsContent value="submission" className="p-6">
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Inspection Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-2xl font-bold text-blue-600">{formData.totalScore}</div>
                      <div className="text-sm text-gray-600">Total Score</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-2xl font-bold text-green-600">{scorePercentage}%</div>
                      <div className="text-sm text-gray-600">Score Rate</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-2xl font-bold text-indigo-600">{Object.keys(formData.scores).length}</div>
                      <div className="text-sm text-gray-600">Parameters Scored</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-2xl font-bold text-purple-600">{completionPercentage}%</div>
                      <div className="text-sm text-gray-600">Complete</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleSave}
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <Save className="h-5 w-5" />
                    Save Progress
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    size="lg"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Send className="h-5 w-5" />
                    Submit Score Card
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreCardForm;
