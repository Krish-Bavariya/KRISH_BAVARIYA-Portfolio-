"use client";

import { useState } from "react";
import { motion, MotionValue, useTransform, useMotionValueEvent } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Track which section is active so we can fully unmount invisible ones
  const [activeSection, setActiveSection] = useState<1 | 2 | 3>(1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.19) setActiveSection(1);
    else if (v < 0.53) setActiveSection(2);
    else setActiveSection(3);
  });

  // Section 1 transforms — fades out hard by 0.12
  const opacity1 = useTransform(scrollYProgress, [0, 0.06, 0.12], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.12], [0, -50]);

  // Section 2 transforms
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.30, 0.45, 0.52], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.30, 0.45, 0.52], [80, 0, 0, -80]);

  // Section 3 transforms
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.63, 0.78, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.63, 0.78, 0.85], [80, 0, 0, -80]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 h-full w-full relative flex items-center justify-center">

        {/* Section 1: Intro — fully unmounted when not active */}
        {activeSection === 1 && (
          <motion.div
            style={{ opacity: opacity1, y: y1 }}
            className="absolute flex flex-col items-center text-center max-w-4xl"
          >
            <span className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase bg-white/5 border border-white/10 text-white/60 backdrop-blur-md">
              AI · ML · Research · Engineering
            </span>
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] text-white">
              <span className="block opacity-40">I am</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                Krish Bavariya.
              </span>
            </h1>
            <p className="mt-6 text-sm md:text-base font-light tracking-[0.15em] text-white/50 uppercase">
              AI / ML Developer &amp; Intelligent Systems Architect
            </p>
          </motion.div>
        )}

        {/* Section 2: Philosophy — fully unmounted when not active */}
        {activeSection === 2 && (
          <motion.div
            style={{ opacity: opacity2, y: y2 }}
            className="absolute left-6 md:left-12 max-w-xl text-left"
          >
            <span className="mb-3 block text-[10px] font-semibold tracking-[0.25em] uppercase text-white/40">
              01 / PHILOSOPHY
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-[1.0] text-white">
              I build systems <br />
              <span className="font-serif italic font-normal text-white/80">that learn,</span> <br />
              reason &amp; adapt.
            </h2>
            <p className="mt-6 text-sm text-white/50 leading-relaxed max-w-sm">
              Specializing in deep learning architectures, generative AI, and production-grade ML pipelines that scale from research to reality.
            </p>
          </motion.div>
        )}

        {/* Section 3: Engineering — fully unmounted when not active */}
        {activeSection === 3 && (
          <motion.div
            style={{ opacity: opacity3, y: y3 }}
            className="absolute right-6 md:right-12 max-w-xl text-right flex flex-col items-end"
          >
            <span className="mb-3 block text-[10px] font-semibold tracking-[0.25em] uppercase text-white/40">
              02 / DUALITY
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-[1.0] text-white">
              From <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-300 font-semibold">
                research
              </span>{" "}
              to <br />
              <span className="font-mono tracking-tighter text-white/90">production</span>.
            </h2>
            <p className="mt-6 text-sm text-white/50 leading-relaxed max-w-sm">
              Turning cutting-edge ML research into reliable, scalable products — bridging notebooks and distributed inference at scale.
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
