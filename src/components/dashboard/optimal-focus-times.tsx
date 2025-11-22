"use client";

import { useState, useEffect } from "react";
import { suggestOptimalFocusTimes } from "@/ai/flows/suggest-optimal-focus-times";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { weeklyFocusDataString } from "@/lib/mock-data";
import { Lightbulb } from "lucide-react";

export function OptimalFocusTimes() {
  const [suggestions, setSuggestions] = useState({ optimalFocusTimes: "", reasoning: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSuggestions() {
      try {
        setLoading(true);
        const result = await suggestOptimalFocusTimes({
          historicalFocusData: weeklyFocusDataString,
        });
        setSuggestions(result);
      } catch (error) {
        console.error("Failed to get optimal focus time suggestions:", error);
        setSuggestions({
            optimalFocusTimes: "Not available",
            reasoning: "Could not generate suggestions. Please try again later."
        });
      } finally {
        setLoading(false);
      }
    }
    getSuggestions();
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <span>Optimal Focus Times</span>
        </CardTitle>
        <CardDescription>
          AI-powered suggestions for when you're most productive.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[50%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[75%]" />
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{suggestions.optimalFocusTimes}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{suggestions.reasoning}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
