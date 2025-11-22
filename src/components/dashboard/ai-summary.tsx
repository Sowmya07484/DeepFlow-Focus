"use client";

import { useState, useEffect } from "react";
import { summarizeFocusData } from "@/ai/flows/summarize-focus-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { weeklyFocusDataString } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";

export function AISummary() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSummary() {
      try {
        setLoading(true);
        const result = await summarizeFocusData({
          weeklyFocusData: weeklyFocusDataString,
        });
        setSummary(result.summary);
      } catch (error) {
        console.error("Failed to get AI summary:", error);
        setSummary("Could not generate summary. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getSummary();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span>AI-Powered Weekly Summary</span>
        </CardTitle>
        <CardDescription>
          Your personalized focus insights from the past week.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[75%]" />
          </div>
        ) : (
          <p className="text-sm leading-relaxed">{summary}</p>
        )}
      </CardContent>
    </Card>
  );
}
