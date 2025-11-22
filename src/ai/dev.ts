import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-focus-data.ts';
import '@/ai/flows/suggest-optimal-focus-times.ts';
import '@/ai/flows/intelligent-distraction-filter.ts';
import '@/ai/flows/personalized-micro-break-suggestions.ts';