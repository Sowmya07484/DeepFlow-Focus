'use server';

/**
 * @fileOverview Analyzes user's historical focus data and suggests optimal times for focused work.
 *
 * - suggestOptimalFocusTimes - A function that returns suggested focus times.
 * - SuggestOptimalFocusTimesInput - The input type for the suggestOptimalFocusTimes function.
 * - SuggestOptimalFocusTimesOutput - The return type for the suggestOptimalFocusTimes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalFocusTimesInputSchema = z.object({
  historicalFocusData: z.string().describe('The user’s historical focus data, including timestamps, duration, and task types.'),
});
export type SuggestOptimalFocusTimesInput = z.infer<typeof SuggestOptimalFocusTimesInputSchema>;

const SuggestOptimalFocusTimesOutputSchema = z.object({
  optimalFocusTimes: z.string().describe('Suggested times of day for focused work, based on analysis of historical data.'),
  reasoning: z.string().describe('Explanation of why these times are optimal, referencing patterns in the historical data.'),
});
export type SuggestOptimalFocusTimesOutput = z.infer<typeof SuggestOptimalFocusTimesOutputSchema>;

export async function suggestOptimalFocusTimes(input: SuggestOptimalFocusTimesInput): Promise<SuggestOptimalFocusTimesOutput> {
  return suggestOptimalFocusTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalFocusTimesPrompt',
  input: {schema: SuggestOptimalFocusTimesInputSchema},
  output: {schema: SuggestOptimalFocusTimesOutputSchema},
  prompt: `Analyze the following historical focus data to determine the optimal times of day for the user to engage in focused work. Provide specific times and a clear explanation of the reasoning behind your suggestions, referencing patterns in the data.

Historical Focus Data:
{{{historicalFocusData}}}

Optimal Focus Times:`, 
});

const suggestOptimalFocusTimesFlow = ai.defineFlow(
  {
    name: 'suggestOptimalFocusTimesFlow',
    inputSchema: SuggestOptimalFocusTimesInputSchema,
    outputSchema: SuggestOptimalFocusTimesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
