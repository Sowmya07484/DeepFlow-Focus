"use client";

import { useState } from "react";
import { BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DistractionFilterTester } from "./distraction-filter-tester";
import { FocusTimer } from "./focus-timer";
import { MicroBreakSuggester } from "./micro-break-suggester";

export function FocusSessionManager() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
          <BrainCircuit className="mr-2 h-5 w-5" />
          Start Focus Session
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">Focus Session</DialogTitle>
          <DialogDescription>
            Enter your flow state and we&apos;ll handle the rest.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="timer" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="timer">Timer</TabsTrigger>
            <TabsTrigger value="breaks">Micro-Breaks</TabsTrigger>
            <TabsTrigger value="filter">Distraction Filter</TabsTrigger>
          </TabsList>
          <TabsContent value="timer">
            <FocusTimer />
          </TabsContent>
          <TabsContent value="breaks">
            <MicroBreakSuggester />
          </TabsContent>
          <TabsContent value="filter">
            <DistractionFilterTester />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
