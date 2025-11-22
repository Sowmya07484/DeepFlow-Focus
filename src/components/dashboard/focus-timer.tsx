"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Pause, Play, RotateCcw } from 'lucide-react';

export function FocusTimer() {
  const totalTime = 25 * 60;
  const [time, setTime] = useState(totalTime); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [isFlow, setIsFlow] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      if(intervalRef.current) clearInterval(intervalRef.current);
      setIsActive(false);
      // TODO: Play a sound or show a notification
    }
    return () => {
      if(intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, time]);

  useEffect(() => {
    // Simulate flow state detection: activate between 80% and 20% of the time
    if (isActive && time < totalTime * 0.8 && time > totalTime * 0.2) {
      setIsFlow(true);
    } else {
      setIsFlow(false);
    }
  }, [time, isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if(intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setTime(totalTime);
    setIsFlow(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-center pt-8">
        <CardTitle className="text-7xl font-mono tracking-tighter">
          {formatTime(time)}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 pt-2 pb-8">
        <div className="w-full max-w-sm space-y-2">
            <Progress value={((totalTime - time) / totalTime) * 100} className="h-3" />
            <div className="flex justify-center items-center gap-2 text-sm font-medium transition-opacity" style={{ opacity: isFlow ? 1 : 0.6}}>
                <div className={`w-3 h-3 rounded-full transition-colors ${isFlow ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`} />
                <span>{isFlow ? "Flow State Detected" : "Detecting Flow State..."}</span>
            </div>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={toggleTimer} size="lg" className="w-32">
            {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
