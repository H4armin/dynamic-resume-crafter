
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, TrendingUp, FileText } from "lucide-react";

interface ATSResultsProps {
  analysis: string;
}

const ATSResults = ({ analysis }: ATSResultsProps) => {
  // Parse the AI response to extract structured data
  const parseAnalysis = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    
    // Extract match percentage (look for percentage in the text)
    const matchRegex = /(\d+)%/;
    const matchResult = text.match(matchRegex);
    const matchPercentage = matchResult ? parseInt(matchResult[1]) : 75;

    // Extract keywords (look for keyword-related sections)
    const keywords = [];
    const keywordSection = text.toLowerCase();
    if (keywordSection.includes('keywords') || keywordSection.includes('skills')) {
      const keywordLines = lines.filter(line => 
        line.toLowerCase().includes('keyword') || 
        line.toLowerCase().includes('skill') ||
        line.includes('•') || line.includes('-')
      );
      keywords.push(...keywordLines.slice(0, 8));
    }

    // Extract suggestions
    const suggestions = [];
    const suggestionLines = lines.filter(line => 
      line.toLowerCase().includes('add') || 
      line.toLowerCase().includes('include') ||
      line.toLowerCase().includes('improve') ||
      line.toLowerCase().includes('recommend')
    );
    suggestions.push(...suggestionLines.slice(0, 6));

    return {
      matchPercentage,
      keywords: keywords.length ? keywords : [
        "Add relevant technical skills",
        "Include industry-specific keywords",
        "Use action verbs in descriptions"
      ],
      suggestions: suggestions.length ? suggestions : [
        "Quantify your achievements with numbers",
        "Use keywords from the job description",
        "Optimize section headings for ATS"
      ]
    };
  };

  const parsed = parseAnalysis(analysis);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getMatchBadgeColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-800";
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      {/* Overall Match Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Overall ATS Match Score
          </CardTitle>
          <CardDescription>
            How well your resume matches the job description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className={`text-4xl font-bold ${getMatchColor(parsed.matchPercentage)}`}>
              {parsed.matchPercentage}%
            </div>
            <Badge className={getMatchBadgeColor(parsed.matchPercentage)}>
              {parsed.matchPercentage >= 80 ? "Excellent" : 
               parsed.matchPercentage >= 60 ? "Good" : "Needs Improvement"}
            </Badge>
          </div>
          <Progress value={parsed.matchPercentage} className="h-3" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Missing Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Keywords to Add
            </CardTitle>
            <CardDescription>
              Important keywords found in the job description
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {parsed.keywords.map((keyword, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{keyword}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improvement Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              ATS Optimization Tips
            </CardTitle>
            <CardDescription>
              Recommendations to make your resume more ATS-friendly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {parsed.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{suggestion}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Detailed Analysis
          </CardTitle>
          <CardDescription>
            Complete AI analysis of your resume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
              {analysis}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ATSResults;
