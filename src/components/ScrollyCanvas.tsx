"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Overlay from "./Overlay";

interface ScrollyCanvasProps {
  children?: React.ReactNode;
}

export default function ScrollyCanvas({ children }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images, progress, loaded } = useImagePreloader();

  // Scroll tracking across the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map progress (0 to 1) to frame indices (0 to 119)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 119]);

  // Main drawing function with cover resize logic
  const drawImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate scaling ratio (Cover sizing)
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;
    
    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image ratio
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is taller than image ratio
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Adjust canvas dimensions to match the DOM size (scaled for DPR)
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Draw active frame immediately after resizing
    const activeFrame = Math.min(Math.floor(frameIndex.get()), 119);
    if (images[activeFrame]) {
      drawImage(images[activeFrame]);
    }
  };

  // Redraw when scroll updates the frameIndex
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!loaded) return;
    const index = Math.min(Math.floor(latest), 119);
    if (images[index]) {
      drawImage(images[index]);
    }
  });

  // Setup resize listeners and draw initial frame
  useEffect(() => {
    if (!loaded) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [loaded, images]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212]">
      {/* Preloader overlay */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          >
            <div className="flex flex-col items-center">
              <motion.div 
                className="text-8xl md:text-9xl font-light tracking-tighter text-white font-mono select-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {String(progress).padStart(3, "0")}%
              </motion.div>
              <div className="w-64 h-[2px] bg-white/10 mt-8 relative overflow-hidden rounded">
                <motion.div 
                  className="h-full bg-white absolute left-0 top-0"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>
              <motion.span 
                className="text-xs uppercase tracking-[0.25em] text-white/40 mt-4 font-sans font-medium"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Preloading Cinematic Frames
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover select-none"
          style={{ backfaceVisibility: "hidden" }}
        />

        {/* Parallax overlays will inject here */}
        {loaded && <Overlay scrollYProgress={scrollYProgress} />}
        {children}

        {/* Floating Scroll Indicator (appears when loaded) */}
        {loaded && (
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="text-[10px] tracking-[0.3em] font-medium text-white/50 uppercase select-none">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-white/50" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
