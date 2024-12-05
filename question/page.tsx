'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Mic, Square } from "lucide-react";

export default function QuestionScreen() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    setIsVisible(true);
    setProgress(100);
  }, []);

  const handleRecordingClick = () => {
    if (!isRecording) {
      router.push('/record');
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className={`w-full max-w-2xl transform transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <CardHeader className="space-y-2">
          <div className="w-full">
            <Progress value={progress} className="transition-all duration-1000" />
          </div>
          <p className="text-sm text-muted-foreground tracking-wide">Question 1 of 8</p>
          <h1 className="text-3xl font-semibold tracking-tight">Interview Question</h1>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <p className="text-base text-muted-foreground tracking-wide leading-relaxed">
              Please answer the following question:
            </p>
            <p className="text-xl font-medium tracking-normal leading-relaxed">
              "What motivates you to work hard?"
            </p>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Preview question audio:</p>
            <audio controls className="w-full rounded-md">
              <source src="/sample-audio.mp3" type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleRecordingClick}
            variant={isRecording ? "destructive" : "default"}
            className="w-full h-12 transition-all duration-300"
          >
            <span className={`flex items-center gap-2 ${isRecording && 'animate-pulse'}`}>
              {isRecording ? (
                <>
                  <Square className="w-4 h-4" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  Start Recording
                </>
              )}
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
