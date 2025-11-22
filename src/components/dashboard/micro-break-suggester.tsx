"use client";

import { useState } from "react";
import { getPersonalizedMicroBreakSuggestion } from "@/ai/flows/personalized-micro-break-suggestions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lightbulb, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";


const formSchema = z.object({
  activityType: z.string().min(1, "Please select an activity type."),
  focusLevel: z.array(z.number()).min(1),
  timeSpent: z.coerce.number().min(1, "Time must be at least 1 minute."),
  userPreferences: z.string().min(1, "Please enter your preferences."),
});

export function MicroBreakSuggester() {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityType: "coding",
      focusLevel: [7],
      timeSpent: 60,
      userPreferences: "stretching, walking",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSuggestion("");
    try {
      const result = await getPersonalizedMicroBreakSuggestion({
        activityType: values.activityType,
        focusLevel: values.focusLevel[0],
        timeSpent: values.timeSpent,
        userPreferences: values.userPreferences,
      });
      setSuggestion(result.suggestion);
    } catch (error) {
      console.error(error);
      setSuggestion("Sorry, I couldn't come up with a suggestion right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Micro-Break AI</CardTitle>
        <CardDescription>
          Feeling stuck? Get a personalized break suggestion from our AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="activityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Activity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select activity" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="coding">Coding</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="reading">Reading</SelectItem>
                        <SelectItem value="studying">Studying</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeSpent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Spent (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="focusLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Focus Level: {field.value[0]}/10</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Break Preferences</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., stretching, music, breathing exercises" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Suggestion
            </Button>
          </form>
        </Form>
        {suggestion && (
          <Alert className="mt-6 bg-accent/20 border-accent/30 text-accent-foreground">
            <Lightbulb className="h-4 w-4 text-accent" />
            <AlertTitle className="text-accent-foreground/90">AI Suggestion</AlertTitle>
            <AlertDescription className="text-accent-foreground/80">{suggestion}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
