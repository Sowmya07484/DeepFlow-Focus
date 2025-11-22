import { LoginForm } from '@/components/auth/login-form';
import { BrainCircuit } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="flex items-center space-x-3">
          <BrainCircuit className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight font-headline text-foreground">
            DeepFlow Focus
          </h1>
        </div>
        <p className="max-w-md text-muted-foreground">
          The intelligent focus-enhancement app to help you achieve, sustain, and amplify your “flow state.”
        </p>
      </div>
      <div className="mt-8 w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}
