"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
export default function InterviewPage() {
  const [isMockActive, setMockActive] = useState(false);
  const router = useRouter(); // Initialize the router
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Unable to access camera. Please check permissions.");
      }
    };

    initializeCamera();

    // Cleanup function
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleButtonClick = () => {
    router.push("/check-permission"); // Navigate to the permissions check page
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="max-w-4xl w-full bg-black text-white rounded-lg p-6 space-y-4">
        {/* Header Section */}
        {/* <header className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold text-indigo-500">ZEKO AI</div>
          <div className="text-sm flex items-center gap-2">
            <span className="bg-gray-800 px-2 py-1 rounded">Zeko</span>
            <span className="text-red-500">26 Minutes</span>
          </div>
        </header> */}

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Left Section - Image */}
          <Card className="bg-gray-800 rounded-lg flex-shrink-0 w-1/2">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                Trainee Interview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <div className="w-full h-60 bg-gray-700 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {error && (
                  <div className="text-red-500 text-sm text-center mt-2">
                    {error}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Section - Instructions */}
          <div className="bg-gray-800 rounded-lg p-4 flex-1">
            <h2 className="text-white font-semibold mb-3">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>
                Ensure stable internet and choose a clean, quiet location.
              </li>
              <li>
                Permission for access of camera, microphone, and entire screen
                sharing is required.
              </li>
              <li>Be in professional attire and avoid distractions.</li>
              <li>
                Give a detailed response, providing as much information as you
                can.
              </li>
              <li>
                Answer the question with examples and projects you've worked on.
              </li>
            </ol>
            <Button
              variant="link"
              onClick={() => setMockActive(!isMockActive)}
              className="text-indigo-500 underline mt-3"
            >
              Try a mock interview with Avya
            </Button>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex justify-center mt-4">
          <Button
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg w-full"
            onClick={() => handleButtonClick()}
          >
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
}