"use client";

import { useVapi } from "@/modules/widget/use-vapi";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const {
    isSpeaking,
    isConnecting,
    isConnected,
    transcript,
    startCall,
    endCall,
  } = useVapi();
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <p>Apps/Widget</p>
      <Button onClick={() => startCall()}>start call</Button>
      <Button onClick={() => endCall()} variant="destructive">
        end call
      </Button>
      <p>isConnected: {isConnected.toString()}</p>
      <p>isSpeaking: {isSpeaking.toString()}</p>
      <p>isConnecting: {isConnecting.toString()}</p>
      <p>transcript: {JSON.stringify(transcript, null, 2)}</p>
    </div>
  );
}
