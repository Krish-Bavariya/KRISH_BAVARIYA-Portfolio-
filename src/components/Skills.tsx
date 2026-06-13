"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg - 90) * (Math.PI / 180);
  return {
    x: +(cx + r * Math.cos(rad)).toFixed(1),
    y: +(cy + r * Math.sin(rad)).toFixed(1),
  };
}

const CX = 300, CY = 300;

// ─── Types & Data ────────────────────────────────────────────────────────────
type CatId = "aiml" | "backend" | "frontend" | "learning";

interface CatMeta {
  label: string;
  color: string;
  glow: string;
  dashed?: boolean;
}

const CATS: Record<CatId, CatMeta> = {
  aiml:     { label: "AI / ML Core",       color: "#a855f7", glow: "rgba(168,85,247,0.25)" },
  backend:  { label: "Backend & DB",       color: "#6366f1", glow: "rgba(99,102,241,0.25)" },
  frontend: { label: "Frontend / Web",      color: "#ec4899", glow: "rgba(236,72,153,0.25)" },
  learning: { label: "Currently learning",  color: "#06b6d4", glow: "rgba(6,182,212,0.25)", dashed: true },
};

interface SNode {
  id: string;
  lines: string[];
  cat: CatId;
  x: number;
  y: number;
  r: number;
}

const NODES: SNode[] = [
  // ── Inner ring (r = 96) — AI / ML Core ──────────────────────────────────
  { id: "pytorch",   lines: ["PyTorch"],            cat: "aiml",    ...polar(CX, CY, 96, 0),   r: 38 },
  { id: "hf",        lines: ["HF Trans-","formers"], cat: "aiml",   ...polar(CX, CY, 96, 60),  r: 38 },
  { id: "sklearn",   lines: ["Scikit","learn"],     cat: "aiml",    ...polar(CX, CY, 96, 120), r: 38 },
  { id: "nlp",       lines: ["NLP","Vision"],       cat: "aiml",    ...polar(CX, CY, 96, 180), r: 38 },
  { id: "mlmodels",  lines: ["ML","Models"],        cat: "aiml",    ...polar(CX, CY, 96, 240), r: 38 },
  { id: "deepl",     lines: ["Deep","Learning"],    cat: "aiml",    ...polar(CX, CY, 96, 300), r: 38 },

  // ── Middle ring (r = 172) — Backend & DB ────────────────────────────────
  { id: "python",    lines: ["Python"],              cat: "backend", ...polar(CX, CY, 172, 30),  r: 36 },
  { id: "sql",       lines: ["SQL"],                 cat: "backend", ...polar(CX, CY, 172, 90),  r: 36 },
  { id: "postgres",  lines: ["Postgres"],            cat: "backend", ...polar(CX, CY, 172, 150), r: 36 },
  { id: "mongodb",   lines: ["MongoDB", "(basics)"], cat: "backend", ...polar(CX, CY, 172, 210), r: 36 },
  { id: "java",      lines: ["Java"],                cat: "backend", ...polar(CX, CY, 172, 270), r: 36 },
  { id: "php",       lines: ["PHP"],                 cat: "backend", ...polar(CX, CY, 172, 330), r: 36 },

  // ── Outer ring (r = 248) — Frontend (4) + Learning (3) ──────────────────
  { id: "html",      lines: ["HTML"],                cat: "frontend",...polar(CX, CY, 248, 15),  r: 33 },
  { id: "css",       lines: ["CSS"],                 cat: "frontend",...polar(CX, CY, 248, 66),  r: 33 },
  { id: "js",        lines: ["JS"],                  cat: "frontend",...polar(CX, CY, 248, 117), r: 33 },
  { id: "angular",   lines: ["Angular", "(basic)"],  cat: "frontend",...polar(CX, CY, 248, 168), r: 33 },
  { id: "finetuning",lines: ["Fine", "Tuning"],      cat: "learning",...polar(CX, CY, 248, 219), r: 33 },
  { id: "agentic",   lines: ["Agentic", "AI"],       cat: "learning",...polar(CX, CY, 248, 270), r: 33 },
  { id: "langchain", lines: ["LangChain"],           cat: "learning",...polar(CX, CY, 248, 321), r: 33 },
];

const TOTAL = NODES.length;

// ─── Component ───────────────────────────────────────────────────────────────
export default function Skills() {
  const [active, setActive]       = useState<CatId | null>(null);
  const [hovered, setHovered]     = useState<string | null>(null);

  const toggle = (id: CatId) => setActive((prev) => (prev === id ? null : id));

  return (
    <section id="skills" className="relative z-20 py-24 border-t border-white/5" style={{ background: "#08080f" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-[9px] tracking-[0.35em] text-violet-400/60 uppercase mb-2">
              AIML DEVELOPER · SKILL MATRIX v1.0
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-white">
              Skills &amp;{" "}
              <span className="font-serif italic font-normal text-white/60">Expertise</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 rounded border border-violet-500/30 text-violet-400/70 bg-violet-500/5">
              {TOTAL} SKILLS LOADED
            </span>
            <motion.a
              href="/cv.pdf"
              download="Krish_Bavariya_CV.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300 text-[10px] font-mono uppercase tracking-widest hover:bg-violet-500/20 transition-all"
            >
              <Download className="w-3 h-3" />
              Download CV
            </motion.a>
          </div>
        </div>

        {/* ── Main two-column layout ──────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-6 items-center lg:items-start">

          {/* ── SVG Orbital Diagram ────────────────────────────────────────── */}
          <div className="flex-shrink-0 w-full max-w-[580px] lg:max-w-[540px]">
            <svg
              viewBox="0 0 600 600"
              className="w-full h-auto select-none"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              {/* Orbit rings */}
              {[96, 172, 248].map((r) => (
                <circle
                  key={r}
                  cx={CX} cy={CY} r={r}
                  fill="none"
                  stroke="rgba(139,92,246,0.14)"
                  strokeWidth="1.2"
                  strokeDasharray="5 7"
                />
              ))}

              {/* Connectors: center → each node */}
              {NODES.map((n) => {
                const isLit = active === null || active === n.cat;
                const cat   = CATS[n.cat];
                return (
                  <line
                    key={`l-${n.id}`}
                    x1={CX} y1={CY} x2={n.x} y2={n.y}
                    stroke={isLit ? cat.color : "rgba(255,255,255,0.04)"}
                    strokeWidth="0.6"
                    strokeOpacity={isLit ? 0.25 : 0.06}
                    style={{ transition: "all 0.4s ease" }}
                  />
                );
              })}

              {/* ── Skill Nodes ──────────────────────────────────────────── */}
              {NODES.map((node) => {
                const cat    = CATS[node.cat];
                const isLit  = active === null || active === node.cat;
                const isHov  = hovered === node.id;

                return (
                  <g
                    key={node.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggle(node.cat)}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Glow pulse on hover */}
                    {isHov && isLit && (
                      <circle
                        cx={node.x} cy={node.y}
                        r={node.r + 8}
                        fill={cat.glow}
                      />
                    )}

                    {/* Node circle */}
                    <circle
                      cx={node.x} cy={node.y} r={node.r}
                      fill={isLit ? `${cat.color}18` : "rgba(255,255,255,0.015)"}
                      stroke={isLit ? cat.color : "rgba(255,255,255,0.08)"}
                      strokeWidth={isHov && isLit ? 2 : 1.2}
                      strokeDasharray={cat.dashed ? "4 3" : undefined}
                      style={{ transition: "all 0.35s ease" }}
                      opacity={isLit ? 1 : 0.22}
                    />

                    {/* Label lines */}
                    {node.lines.map((line, li) => (
                      <text
                        key={li}
                        x={node.x}
                        y={node.y + (li - (node.lines.length - 1) / 2) * 12 + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="9.5"
                        fontWeight="700"
                        letterSpacing="0.4"
                        fill={isLit ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.2)"}
                        style={{ transition: "fill 0.35s ease", pointerEvents: "none" }}
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                );
              })}

              {/* ── Center node ──────────────────────────────────────────── */}
              <circle
                cx={CX} cy={CY} r={54}
                fill="rgba(88,28,235,0.22)"
                stroke="#7c3aed"
                strokeWidth="1.8"
              />
              {/* Subtle inner glow ring */}
              <circle
                cx={CX} cy={CY} r={46}
                fill="none"
                stroke="rgba(167,139,250,0.2)"
                strokeWidth="1"
              />
              <text x={CX} y={CY - 9} textAnchor="middle" dominantBaseline="middle" fontSize="11.5" fontWeight="bold" letterSpacing="2.5" fill="white">
                CORE
              </text>
              <text x={CX} y={CY + 9} textAnchor="middle" dominantBaseline="middle" fontSize="10.5" letterSpacing="1.5" fill="#a78bfa">
                AI/ML
              </text>
            </svg>
          </div>

          {/* ── Right Panel ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 w-full lg:pt-2 space-y-3">

            {/* Category rows */}
            {(Object.entries(CATS) as [CatId, CatMeta][]).map(([id, meta]) => {
              const count      = NODES.filter((n) => n.cat === id).length;
              const isSelected = active === id;

              return (
                <motion.button
                  key={id}
                  onClick={() => toggle(id)}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="w-full flex items-center justify-between px-6 py-5 rounded-xl border text-left transition-colors duration-300"
                  style={{
                    borderColor: isSelected ? `${meta.color}55` : "rgba(255,255,255,0.06)",
                    backgroundColor: isSelected ? `${meta.color}0d` : "rgba(255,255,255,0.01)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Indicator dot */}
                    <span
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: meta.dashed ? "transparent" : meta.color,
                        border: meta.dashed ? `2px dashed ${meta.color}` : "none",
                        boxShadow: isSelected ? `0 0 12px ${meta.color}` : "none",
                      }}
                    />
                    <span
                      className="font-mono text-base tracking-wide transition-colors duration-300 font-medium"
                      style={{ color: isSelected ? meta.color : "rgba(255,255,255,0.6)" }}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <span className="font-mono text-xs tracking-[0.2em] text-white/30">
                    {meta.dashed ? "dashed" : `${count} nodes`}
                  </span>
                </motion.button>
              );
            })}

            {/* ── Skill chips / hint ─────────────────────────────────────── */}
            <div className="pt-7 px-1 min-h-[120px]">
              <AnimatePresence mode="wait">
                {active === null ? (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-xs tracking-[0.3em] text-white/20 text-center pt-4"
                  >
                    — click any category or node —
                  </motion.p>
                ) : (
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p
                      className="font-mono text-[11px] tracking-[0.3em] uppercase mb-5"
                      style={{ color: `${CATS[active].color}99` }}
                    >
                      {CATS[active].label} · skills
                    </p>
                    <div className="flex flex-wrap gap-2.5 break-words">
                      {NODES.filter((n) => n.cat === active).map((n) => (
                        <motion.span
                          key={n.id}
                          initial={{ opacity: 0, scale: 0.88 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 py-2 rounded-lg text-sm font-mono tracking-wide break-words"
                          style={{
                            border: `1px ${CATS[active].dashed ? "dashed" : "solid"} ${CATS[active].color}55`,
                            color: CATS[active].color,
                            backgroundColor: `${CATS[active].color}12`,
                          }}
                        >
                          {n.lines.join(" ")}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
