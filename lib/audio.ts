"use client";
import { useEffect, useRef } from "react";

export function useAudioUnlock() {
  const unlockedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/notify.mp3");

    const unlock = async () => {
      try {
        await audio.play();
        audio.pause();
        audio.currentTime = 0;
        unlockedRef.current = true;
        console.log("🔓 Audio unlocked");
      } catch (err) {
        console.error("Unlock failed:", err);
      }

      document.removeEventListener("click", unlock);
      document.removeEventListener("touchstart", unlock);
    };

    document.addEventListener("click", unlock);
    document.addEventListener("touchstart", unlock);

    return () => {
      document.removeEventListener("click", unlock);
      document.removeEventListener("touchstart", unlock);
    };
  }, []);

  // ✅ Return the ref so you can check its value outside
  return unlockedRef;
}
