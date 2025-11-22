"use client";

import { useState } from "react";
import { intelligentDistractionFilter } from "@/ai/flows/intelligent-distraction-filter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Shield, ShieldAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  notificationContent: z.string().min(10, "Please describe the notification."),
  currentTaskDescription: z.string().min(10, "Please describe your current task."),
  userPriorityKeywords: z.string().min(3, "Please provide some priority keywords."),
});

type FilterResult = {
  shouldBlock: boolean;
  reason: string;
} | null;

export function DistractionFilterTester() {
  const [result, setResult] = useState<FilterResult>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notificationContent: "Your friend just posted a new photo on Instagram.",
      currentTaskDescription: "Writing a research paper on quantum physics.",
      userPriorityKeywords: "research, deep work, academics, deadlines",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const filterResult = await intelligentDistractionFilter(values);
      setResult(filterResult);
    } catch (error) {
      console.error(error);
      setResult({ shouldBlock: false, reason: "Sorry, the filter AI is unavailable right now." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Distraction Filter AI</CardTitle>
        <CardDescription>
          Test how our AI decides whether to block a notification to protect your flow.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="notificationContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notification Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 'New email from your professor about Project X'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentTaskDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Current Task</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 'Finalizing my thesis presentation slides'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userPriorityKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Priority Keywords</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 'urgent, family, thesis, deadline'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Test Filter
            </Button>
          </form>
        </Form>
        {result && (
          <Alert className="mt-6" variant={result.shouldBlock ? "destructive" : "default"}>
            {result.shouldBlock ? <ShieldAlert className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
            <AlertTitle>
              {result.shouldBlock ? "Result: Block Notification" : "Result: Allow Notification"}
            </AlertTitle>
            <AlertDescription>{result.reason}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
