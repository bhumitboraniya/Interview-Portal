"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Page = () => {
  const [permissions, setPermissions] = useState({
    video: false,
    audio: false,
    screen: false,
  });
  const [error, setError] = useState(null);
  const [permissionsChecked, setPermissionsChecked] = useState(false);
  const videoRef = useRef(null);
  const router = useRouter();

  const checkPermissions = async () => {
    if (permissionsChecked) {
      // Permissions have already been checked
      if (permissions.video && permissions.audio) {
        router.push("/questions");
      }
      return;
    }

    try {
      // Video and Audio Permissions
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const updatedPermissions = { ...permissions, video: true, audio: true };

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      // Screen Sharing Permissions
      if (!updatedPermissions.screen) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        updatedPermissions.screen = true;

        // Monitor screen sharing stop
        screenStream.getTracks()[0].onended = () => {
          console.warn("Screen sharing stopped.");
          setError("Screen sharing stopped. Please restart screen sharing.");
          updatedPermissions.screen = false; // Update state
          setPermissions(updatedPermissions);
        };
      }

      setPermissions(updatedPermissions);
      setPermissionsChecked(true);

      if (updatedPermissions.video && updatedPermissions.audio) {
        router.push("/question");
      }
    } catch (err) {
      console.error("Permission error:", err);
      setError("Please allow all required permissions to continue.");
    }
  };

  const allPermissionsGranted = permissions.video && permissions.audio && permissions.screen;

  const PermissionStatus = ({ granted, label }) => (
    <div className="flex items-center gap-2 mb-4">
      {granted ? (
        <CheckCircle2 className="h-6 w-6 text-green-500" />
      ) : (
        <XCircle className="h-6 w-6 text-red-500" />
      )}
      <span className="text-sm">{label}</span>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#111827]">
      {/* Left side - Video Preview */}
      <div className="w-1/2 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md p-4 bg-slate-900 border-slate-800">
          <video 
            ref={videoRef} 
            autoPlay 
            muted
            className="w-full rounded-lg bg-slate-800"
            style={{ aspectRatio: '16/9' }}
          />
        </Card>
      </div>

      {/* Right side - Permissions */}
      <div className="w-1/2 p-6 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md p-6 bg-slate-900 border-slate-800">
          <h2 className="text-xl font-semibold mb-6 text-white">Permission Check</h2>
          
          <PermissionStatus granted={permissions.video} label="Camera Access" />
          <PermissionStatus granted={permissions.audio} label="Microphone Access" />
          <PermissionStatus granted={permissions.screen} label="Screen Sharing" />

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            className="w-full"
            size="lg"
            onClick={checkPermissions}
            disabled={permissionsChecked && !allPermissionsGranted}
          >
            {permissionsChecked ? 
              (allPermissionsGranted ? "Start Interview" : "Missing Permissions") : 
              "Check Permissions"
            }
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Page;
