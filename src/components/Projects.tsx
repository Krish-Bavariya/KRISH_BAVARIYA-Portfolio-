"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  link: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "01",
    title: "NeuralForge LLM",
    category: "Generative AI / NLP",
    description:
      "Fine-tuned a 7B-parameter LLaMA-based language model on domain-specific corpora using QLoRA & PEFT, achieving 92% task accuracy with 4-bit quantization for edge deployment.",
    link: "#",
    tags: ["PyTorch", "Transformers", "QLoRA", "PEFT", "vLLM"],
  },
  {
    id: "02",
    title: "VisionCore CV Pipeline",
    category: "Computer Vision / Detection",
    description:
      "End-to-end real-time object detection and segmentation pipeline using YOLOv9 and SAM2, deployed on NVIDIA Triton Inference Server with sub-20ms latency at 60 FPS.",
    link: "#",
    tags: ["YOLOv9", "SAM2", "ONNX", "Triton", "OpenCV"],
  },
  {
    id: "03",
    title: "ContextRAG Engine",
    category: "RAG / Vector Search",
    description:
      "Production-ready Retrieval-Augmented Generation system with hybrid dense-sparse retrieval, re-ranking via cross-encoders, and streaming LLM responses. Reduced hallucination rate by 68%.",
    link: "#",
    tags: ["LangChain", "Qdrant", "FastAPI", "ColBERT", "OpenAI API"],
  },
  {
    id: "04",
    title: "AgentMesh Framework",
    category: "Autonomous Agents / Orchestration",
    description:
      "Multi-agent orchestration framework enabling autonomous task decomposition, tool use, and memory management across cooperative LLM agents with self-reflection and critique loops.",
    link: "#",
    tags: ["LangGraph", "AutoGen", "Redis", "Python", "Docker"],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md p-8 md:p-10 transition-all duration-500 hover:border-violet-500/20 hover:bg-white/[0.04]"
    >
      {/* Spotlight Hover Glow Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(139, 92, 246, 0.08), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Header row */}
          <div className="flex justify-between items-start mb-8">
            <span className="text-sm font-mono text-white/30">{project.id}</span>
            <span className="text-[10px] tracking-widest font-semibold uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/60">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-4 group-hover:text-white transition-colors duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed font-light mb-8 max-w-sm">
            {project.description}
          </p>
        </div>

        {/* Footer row */}
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            className="inline-flex items-center gap-1 text-xs tracking-wider uppercase font-semibold text-white/70 hover:text-white transition-colors duration-300 group/link"
          >
            View Case Study
            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-20 py-32 bg-[#121212] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase block mb-3">
              Featured AI/ML Projects
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white">
              Intelligent{" "}
              <span className="font-serif italic font-normal text-white/80">Systems Built</span>
            </h2>
          </div>
          <p className="text-sm text-white/40 font-light max-w-xs mt-6 md:mt-0 leading-relaxed">
            A selection of production AI systems, research prototypes, and open-source ML tooling shipped across domains.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <p className="text-xs text-white/30 tracking-widest uppercase mb-4">
            Interested in AI/ML collaboration?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-200 transition-colors duration-300 shadow-lg"
          >
            Get In Touch
          </motion.a>
        </div>

      </div>
    </section>
  );
}
