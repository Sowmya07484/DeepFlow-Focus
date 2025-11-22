import { Clock, TrendingUp, Zap } from "lucide-react";
import { AISummary } from "@/components/dashboard/ai-summary";
import { FocusChart } from "@/components/dashboard/focus-chart";
import { FocusSessionManager } from "@/components/dashboard/focus-session-manager";
import { SessionsChart } from "@/components/dashboard/sessions-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Your Focus Dashboard
          </h1>
          <p className="text-muted-foreground">
            Insights into your flow states and productivity.
          </p>
        </div>
        <FocusSessionManager />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Flow Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16h 40m</div>
            <p className="text-xs text-muted-foreground">+20.1% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Focus Sessions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23</div>
            <p className="text-xs text-muted-foreground">+18.2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43.5 min</div>
            <p className="text-xs text-muted-foreground">+5 min from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Weekly Focus Pattern</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <FocusChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Session Durations</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SessionsChart />
          </CardContent>
        </Card>
      </div>
      
      <AISummary />

    </div>
  );
}
