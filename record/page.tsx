'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Video, VideoOff, Mic, MicOff } from "lucide-react";

export default function RecordingScreen() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setRecorder(mediaRecorder);
      setRecording(true);
      
      // Simulate progress
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 100));
      }, 100);

      mediaRecorder.onstop = () => {
        clearInterval(interval);
        stream.getTracks().forEach(track => track.stop());
      };
    } catch (err) {
      setError('Please allow camera and microphone access');
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setRecording(false);
      router.push('/completion');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className={`w-full max-w-3xl transform transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <CardContent className="p-6 space-y-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover"
              muted
              playsInline
            />
            {!recording && !videoRef.current?.srcObject && (
              <div className="absolute inset-0 flex items-center justify-center">
                <VideoOff className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
          </div>

          {recording && (
            <div className="space-y-2">
              <Progress value={progress} className="transition-all" />
              <p className="text-sm text-muted-foreground text-center">
                Recording in progress...
              </p>
            </div>
          )}

          <div className="flex justify-center gap-4">
            {!recording ? (
              <Button
                size="lg"
                onClick={startRecording}
                className="w-48 transition-all duration-300"
              >
                {videoRef.current?.srcObject ? (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Start Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Initialize Camera
                  </>
                )}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="destructive"
                onClick={stopRecording}
                className="w-48 transition-all duration-300"
              >
                <MicOff className="w-4 h-4 mr-2" />
                Stop Recording
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
