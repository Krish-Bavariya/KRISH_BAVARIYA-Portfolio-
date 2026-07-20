import { useState, useEffect, useRef, useCallback } from "react";

const TOTAL_FRAMES = 120;
// How many frames to preload in the high-priority batch before background-loading the rest
const PRIORITY_BATCH = 30;
// How many frames to load in parallel per background batch
const BACKGROUND_BATCH_SIZE = 10;

const pad = (num: number) => String(num).padStart(3, "0");
const frameSrc = (i: number) => `/sequence/frame_${pad(i)}_delay-0.066s.png`;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });
}

export function useImagePreloader() {
  const [progress, setProgress] = useState(0);
  // ready = first frame available → canvas can show immediately
  const [ready, setReady] = useState(false);
  // loaded = all 120 frames available
  const [loaded, setLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>(new Array(TOTAL_FRAMES));
  const loadedCountRef = useRef(0);

  const incrementProgress = useCallback(() => {
    loadedCountRef.current += 1;
    const count = loadedCountRef.current;
    setProgress(Math.round((count / TOTAL_FRAMES) * 100));
    if (count === TOTAL_FRAMES) {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // ── Step 1: Load frame 0 immediately so the canvas appears ──────────
      try {
        const first = await loadImage(frameSrc(0));
        if (cancelled) return;
        imagesRef.current[0] = first;
        incrementProgress();
        setReady(true);
      } catch {
        if (cancelled) return;
        incrementProgress();
        setReady(true); // still unblock even on error
      }

      // ── Step 2: Load frames 1 → PRIORITY_BATCH-1 in parallel ────────────
      const priorityPromises: Promise<void>[] = [];
      for (let i = 1; i < PRIORITY_BATCH; i++) {
        const index = i;
        priorityPromises.push(
          loadImage(frameSrc(index))
            .then((img) => {
              if (cancelled) return;
              imagesRef.current[index] = img;
              incrementProgress();
            })
            .catch(() => {
              if (cancelled) return;
              incrementProgress();
            })
        );
      }
      await Promise.all(priorityPromises);

      // ── Step 3: Load remaining frames in small background batches ─────────
      for (
        let start = PRIORITY_BATCH;
        start < TOTAL_FRAMES;
        start += BACKGROUND_BATCH_SIZE
      ) {
        if (cancelled) return;
        const end = Math.min(start + BACKGROUND_BATCH_SIZE, TOTAL_FRAMES);
        const batch: Promise<void>[] = [];
        for (let i = start; i < end; i++) {
          const index = i;
          batch.push(
            loadImage(frameSrc(index))
              .then((img) => {
                if (cancelled) return;
                imagesRef.current[index] = img;
                incrementProgress();
              })
              .catch(() => {
                if (cancelled) return;
                incrementProgress();
              })
          );
        }
        await Promise.all(batch);
        // Yield to the browser between batches to keep scrolling smooth
        await new Promise((r) => setTimeout(r, 0));
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [incrementProgress]);

  return {
    images: imagesRef.current,
    progress,
    ready,
    loaded,
  };
}
