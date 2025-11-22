'use server';

/**
 * @fileOverview A flow that intelligently filters distractions based on urgency and relevance.
 *
 * - intelligentDistractionFilter - A function that filters distractions.
 * - IntelligentDistractionFilterInput - The input type for the intelligentDistractionFilter function.
 * - IntelligentDistractionFilterOutput - The return type for the intelligentDistractionFilter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentDistractionFilterInputSchema = z.object({
  notificationContent: z
    .string()
    .describe('The content of the notification or interruption.'),
  currentTaskDescription: z
    .string()
    .describe('A description of the task the user is currently working on.'),
  userPriorityKeywords: z
    .string()
    .describe(
      'Keywords representing the users priorities for filtering interruptions.'
    ),
});
export type IntelligentDistractionFilterInput = z.infer<
  typeof IntelligentDistractionFilterInputSchema
>;

const IntelligentDistractionFilterOutputSchema = z.object({
  shouldBlock: z
    .boolean()
    .describe(
      'Whether the notification should be blocked (true) or allowed (false).'n    ),
  reason: z
    .string()
    .describe('The reason for blocking or allowing the notification.'),
});
export type IntelligentDistractionFilterOutput = z.infer<
  typeof IntelligentDistractionFilterOutputSchema
>;

export async function intelligentDistractionFilter(
  input: IntelligentDistractionFilterInput
): Promise<IntelligentDistractionFilterOutput> {
  return intelligentDistractionFilterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentDistractionFilterPrompt',
  input: {schema: IntelligentDistractionFilterInputSchema},
  output: {schema: IntelligentDistractionFilterOutputSchema},
  prompt: `You are an intelligent notification filter that determines whether a notification should be blocked based on its relevance to the user\'s current task and priorities.

  User Priorities: {{{userPriorityKeywords}}}
  Current Task: {{{currentTaskDescription}}}
  Notification Content: {{{notificationContent}}}

  Determine if the notification is relevant to the current task and if it aligns with the user\'s priorities. If the notification is likely to distract the user from their task or is not relevant to their priorities, block it. If it could be important, then don\'t block the notification.

  Return a JSON object with 'shouldBlock' set to true if the notification should be blocked, and false otherwise. Provide a 'reason' for your decision.
  `,
});

const intelligentDistractionFilterFlow = ai.defineFlow(
  {
    name: 'intelligentDistractionFilterFlow',
    inputSchema: IntelligentDistractionFilterInputSchema,
    outputSchema: IntelligentDistractionFilterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

