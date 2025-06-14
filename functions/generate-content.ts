import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { field, content, action } = await req.json();

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare prompt based on action
    let prompt = "";
    
    if (action === "analyze" && field === "ats-analysis") {
      const { resume, jobDescription } = JSON.parse(content);
      prompt = `As an expert ATS (Applicant Tracking System) analyzer, compare the following resume with the job description and provide a comprehensive analysis:

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}

Please provide:
1. Match Percentage (0-100%): How well the resume matches the job requirements
2. Missing Keywords: List 5-8 important keywords from the job description that are missing from the resume
3. ATS Optimization Suggestions: Provide 5-6 specific recommendations to make the resume more ATS-friendly
4. Skills Gap Analysis: What skills mentioned in the job description are missing from the resume
5. Formatting Recommendations: Suggestions for better ATS compatibility

Format your response clearly with sections and bullet points for easy reading.`;
    } else {
      // Keep existing logic for other actions
      switch (action) {
        case "generate":
          prompt = `Generate 3 professional variations for a resume ${field}. Current content: ${content}. Format the response as 3 clear numbered options.`;
          break;
        case "professional":
          prompt = `Make this resume ${field} more professional while maintaining accuracy: ${content}`;
          break;
        case "simplify":
          prompt = `Simplify this resume ${field} while keeping it professional and clear: ${content}`;
          break;
        case "technical":
          prompt = `Enhance the technical details in this resume ${field}, focusing on industry-specific terminology and achievements: ${content}`;
          break;
        default:
          prompt = `Improve this resume ${field}: ${content}`;
      }
    }

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    return new Response(JSON.stringify({
      content: generatedText,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Generation error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
