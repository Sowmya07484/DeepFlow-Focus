'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized micro-break suggestions to users.
 *
 * It exports:
 * - `getPersonalizedMicroBreakSuggestion`: An async function that takes user activity data and returns a personalized micro-break suggestion.
 * - `PersonalizedMicroBreakInput`: The TypeScript type definition for the input object of `getPersonalizedMicroBreakSuggestion`.
 * - `PersonalizedMicroBreakOutput`: The TypeScript type definition for the output object of `getPersonalizedMicroBreakSuggestion`.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedMicroBreakInputSchema = z.object({
  activityType: z.string().describe('The type of activity the user is currently engaged in (e.g., coding, writing, reading).'),
  focusLevel: z.number().describe('A numerical value representing the user’s current focus level (e.g., 1-10).'),
  timeSpent: z.number().describe('The amount of time (in minutes) the user has been continuously engaged in the activity.'),
  userPreferences: z.string().describe('The user’s preferences for micro-breaks (e.g., stretching, walking, meditation).'),
});

export type PersonalizedMicroBreakInput = z.infer<typeof PersonalizedMicroBreakInputSchema>;

const PersonalizedMicroBreakOutputSchema = z.object({
  suggestion: z.string().describe('A personalized micro-break suggestion based on the user’s activity, focus level, time spent, and preferences.'),
});

export type PersonalizedMicroBreakOutput = z.infer<typeof PersonalizedMicroBreakOutputSchema>;

export async function getPersonalizedMicroBreakSuggestion(
    input: PersonalizedMicroBreakInput
): Promise<PersonalizedMicroBreakOutput> {
  return personalizedMicroBreakFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedMicroBreakPrompt',
  input: {schema: PersonalizedMicroBreakInputSchema},
  output: {schema: PersonalizedMicroBreakOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized micro-break suggestions to users to help them maintain their focus and flow state.

  Based on the user's current activity, focus level, time spent on the activity, and their preferences, suggest a micro-break activity that will help them effectively maintain their flow state.

  Activity Type: {{{activityType}}}
  Focus Level: {{{focusLevel}}}
  Time Spent: {{{timeSpent}}} minutes
  User Preferences: {{{userPreferences}}}

  Suggestion:`,
});

const personalizedMicroBreakFlow = ai.defineFlow(
  {
    name: 'personalizedMicroBreakFlow',
    inputSchema: PersonalizedMicroBreakInputSchema,
    outputSchema: PersonalizedMicroBreakOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
