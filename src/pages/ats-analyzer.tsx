
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Target, Sparkles } from "lucide-react";
import { toast } from "sonner";
import ATSResults from "@/components/ats/ATSResults";

const ATSAnalyzer = () => {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setResume(e.target?.result as string);
        toast.success("Resume uploaded successfully!");
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a text file (.txt)");
    }
  };

  const analyzeResume = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      toast.error("Please provide both resume and job description");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/functions/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field: 'ats-analysis',
          content: JSON.stringify({ resume, jobDescription }),
          action: 'analyze'
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysis(result.content);
      toast.success("Analysis completed!");
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ATS Resume Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare your resume with job descriptions and get AI-powered suggestions to make it more ATS-friendly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Resume Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Your Resume
              </CardTitle>
              <CardDescription>
                Upload your resume or paste the content below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="resume-upload">Upload Resume (Text file)</Label>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-2"
                />
              </div>
              <div>
                <Label htmlFor="resume-text">Or paste your resume text</Label>
                <Textarea
                  id="resume-text"
                  placeholder="Paste your resume content here..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="min-h-[300px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Job Description Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Job Description
              </CardTitle>
              <CardDescription>
                Paste the job description you're applying for
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[350px]"
              />
            </CardContent>
          </Card>
        </div>

        {/* Analyze Button */}
        <div className="text-center mb-8">
          <Button
            onClick={analyzeResume}
            disabled={isAnalyzing || !resume.trim() || !jobDescription.trim()}
            size="lg"
            className="px-8 py-3"
          >
            {isAnalyzing ? (
              "Analyzing..."
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze Resume
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        {analysis && <ATSResults analysis={analysis} />}
      </div>
    </div>
  );
};

export default ATSAnalyzer;
