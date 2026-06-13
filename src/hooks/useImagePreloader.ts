import { useState, useEffect, useRef } from "react";

export function useImagePreloader() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const totalFrames = 120;
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const pad = (num: number) => String(num).padStart(3, "0");

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // Next.js serves from public directory, so path starts with /sequence/
      img.src = `/sequence/frame_${pad(i)}_delay-0.066s.png`;
      
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / totalFrames) * 100));
        
        if (loadedCount === totalFrames) {
          setLoaded(true);
        }
      };

      img.onerror = () => {
        console.error(`Failed to load frame: ${img.src}`);
        loadedCount++;
        setProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setLoaded(true);
        }
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;
  }, []);

  return {
    images: imagesRef.current,
    progress,
    loaded,
  };
}
