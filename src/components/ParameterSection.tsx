
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface Parameter {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface ParameterSectionProps {
  title: string;
  parameters: Parameter[];
  scores: Record<string, number>;
  remarks: Record<string, string>;
  onScoreChange: (parameterId: string, score: number) => void;
  onRemarksChange: (parameterId: string, remarks: string) => void;
}

const ScoreButton = ({ 
  score, 
  selectedScore, 
  onClick 
}: { 
  score: number; 
  selectedScore?: number; 
  onClick: () => void;
}) => {
  const isSelected = selectedScore === score;
  const getColorClass = () => {
    if (!isSelected) return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
    if (score >= 8) return 'bg-green-500 text-white';
    if (score >= 6) return 'bg-yellow-500 text-white';
    if (score >= 4) return 'bg-orange-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 hover:scale-110 ${getColorClass()}`}
    >
      {score}
    </button>
  );
};

const ParameterSection: React.FC<ParameterSectionProps> = ({
  title,
  parameters,
  scores,
  remarks,
  onScoreChange,
  onRemarksChange
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <Badge variant="secondary" className="text-sm">
          {Object.keys(scores).filter(id => parameters.some(p => p.id === id)).length}/{parameters.length} Complete
        </Badge>
      </div>

      <div className="grid gap-6">
        {parameters.map((parameter) => {
          const currentScore = scores[parameter.id];
          const isCompleted = currentScore !== undefined;

          return (
            <Card key={parameter.id} className={`transition-all duration-200 ${isCompleted ? 'ring-2 ring-green-200 bg-green-50' : 'hover:shadow-md'}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {parameter.name}
                      {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{parameter.description}</p>
                  </div>
                  {currentScore !== undefined && (
                    <Badge 
                      className={`ml-4 ${
                        currentScore >= 8 ? 'bg-green-500' :
                        currentScore >= 6 ? 'bg-yellow-500' :
                        currentScore >= 4 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                    >
                      {currentScore}/10
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Score (0-10) *
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                      <ScoreButton
                        key={score}
                        score={score}
                        selectedScore={currentScore}
                        onClick={() => onScoreChange(parameter.id, score)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor={`remarks-${parameter.id}`} className="text-base font-medium">
                    Remarks (Optional)
                  </Label>
                  <Textarea
                    id={`remarks-${parameter.id}`}
                    placeholder="Add any specific observations or notes..."
                    value={remarks[parameter.id] || ''}
                    onChange={(e) => onRemarksChange(parameter.id, e.target.value)}
                    className="mt-2 min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ParameterSection;
