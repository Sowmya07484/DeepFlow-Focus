'use server';

/**
 * @fileOverview Summarizes weekly focus data for users, highlighting patterns and improvements.
 *
 * - summarizeFocusData - A function that summarizes the user's focus data for the week.
 * - SummarizeFocusDataInput - The input type for the summarizeFocusData function.
 * - SummarizeFocusDataOutput - The return type for the summarizeFocusData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFocusDataInputSchema = z.object({
  weeklyFocusData: z
    .string()
    .describe("A stringified JSON array containing the user's focus data for the week."),
});
export type SummarizeFocusDataInput = z.infer<typeof SummarizeFocusDataInputSchema>;

const SummarizeFocusDataOutputSchema = z.object({
  summary: z
    .string()
    .describe('A summary of the user focus data, highlighting key patterns and improvements.'),
});
export type SummarizeFocusDataOutput = z.infer<typeof SummarizeFocusDataOutputSchema>;

export async function summarizeFocusData(input: SummarizeFocusDataInput): Promise<SummarizeFocusDataOutput> {
  return summarizeFocusDataFlow(input);
}

const summarizeFocusDataPrompt = ai.definePrompt({
  name: 'summarizeFocusDataPrompt',
  input: {schema: SummarizeFocusDataInputSchema},
  output: {schema: SummarizeFocusDataOutputSchema},
  prompt: `You are an AI assistant that summarizes the user's weekly focus data.

  Analyze the following data and provide a concise summary, highlighting key patterns,
  improvements, and areas where the user can improve their focus habits.

  Focus Data: {{{weeklyFocusData}}}
  `,
});

const summarizeFocusDataFlow = ai.defineFlow(
  {
    name: 'summarizeFocusDataFlow',
    inputSchema: SummarizeFocusDataInputSchema,
    outputSchema: SummarizeFocusDataOutputSchema,
  },
  async input => {
    const {output} = await summarizeFocusDataPrompt(input);
    return output!;
  }
);
