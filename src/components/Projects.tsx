"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  detailDescription: string;
  link: string;
  github: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "01",
    title: "NeuralForge LLM",
    category: "Generative AI / NLP",
    description:
      "Fine-tuned a 7B-parameter LLaMA-based language model on domain-specific corpora using QLoRA & PEFT, achieving 92% task accuracy with 4-bit quantization for edge deployment.",
    detailDescription:
      "Built a full fine-tuning pipeline for a 7B-parameter LLaMA model using QLoRA and PEFT techniques. Achieved 4-bit quantization enabling edge deployment with minimal performance loss. The system attained 92% task accuracy on domain-specific benchmarks, significantly outperforming the base model. Includes custom data preprocessing, evaluation harnesses, and a vLLM-powered inference server.",
    link: "#",
    github: "#",
    tags: ["PyTorch", "Transformers", "QLoRA", "PEFT", "vLLM"],
  },
  {
    id: "02",
    title: "Adam: Paper Re-Implementation",
    category: "Research / Optimization",
    description:
      "Re-implemented Kingma & Ba's Adam optimizer (ICLR 2015) from scratch in NumPy — bias-corrected moment estimates, learning-rate decay, and all — then validated it on a 3-class spiral dataset with a live Streamlit demo.",
    detailDescription:
      "Took Algorithm 1 from Kingma & Ba's seminal ICLR 2015 paper and translated every mathematical symbol into working NumPy code — first-moment (momentum) and second-moment (adaptive) estimates, bias-correction terms, and an inverse-decay learning-rate schedule. Validated the optimizer on a non-convex 3-class spiral classification task using a 2-layer ReLU network, mirroring the paper's own Section 6.2 experiment. Shipped an interactive Streamlit demo where you can tune hyperparameters (β₁, β₂, ε, lr, decay) and watch the decision boundary evolve in real time.",
    link: "https://adam-live-demo.streamlit.app/",
    github: "https://github.com/Krish-Bavariya/Adam_Paper_Re-Implementation",
    tags: ["NumPy", "Streamlit", "Adam", "Neural Networks", "Python"],
  },
  {
    id: "03",
    title: "ContextRAG Engine",
    category: "RAG / Vector Search",
    description:
      "Production-ready Retrieval-Augmented Generation system with hybrid dense-sparse retrieval, re-ranking via cross-encoders, and streaming LLM responses. Reduced hallucination rate by 68%.",
    detailDescription:
      "Engineered a production-grade RAG pipeline combining dense vector search (Qdrant) with sparse BM25 retrieval, then re-ranked candidates using ColBERT cross-encoders. Integrated streaming LLM responses via OpenAI API and LangChain, reducing end-to-end latency by 40%. A rigorous evaluation framework measuring hallucination rate achieved a 68% reduction compared to naive RAG baselines.",
    link: "#",
    github: "#",
    tags: ["LangChain", "Qdrant", "FastAPI", "ColBERT", "OpenAI API"],
  },
  {
    id: "04",
    title: "AgentMesh Framework",
    category: "Autonomous Agents / Orchestration",
    description:
      "Multi-agent orchestration framework enabling autonomous task decomposition, tool use, and memory management across cooperative LLM agents with self-reflection and critique loops.",
    detailDescription:
      "Designed a modular multi-agent system using LangGraph and AutoGen where specialized agents (planner, executor, critic) collaborate autonomously. Agents maintain short- and long-term memory via Redis, use pluggable tool interfaces, and apply self-reflection loops to correct their own outputs. The framework handles task decomposition, parallel subtask execution, and result synthesis — enabling complex workflows that no single LLM call could reliably complete.",
    link: "#",
    github: "#",
    tags: ["LangGraph", "AutoGen", "Redis", "Python", "Docker"],
  },
];

// ── Project Detail Modal ──────────────────────────────────────────────────────

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const hasRealGithub = project.github && project.github !== "#";
  const hasRealLink = project.link && project.link !== "#";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-4 mb-4 md:mb-0 rounded-3xl bg-[#181818] border border-white/10 overflow-hidden shadow-2xl"
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 340, damping: 30 }}
      >
        {/* Top gradient bar */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-white/30">{project.id}</span>
              <span className="text-[10px] tracking-widest font-semibold uppercase bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full text-violet-300">
                {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close project detail"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
            {project.title}
          </h3>

          {/* Detailed description */}
          <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
            {project.detailDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5 mb-8" />

          {/* Action links */}
          <div className="flex flex-wrap gap-3">
            {hasRealGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider uppercase text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <GithubIcon size={14} />
                GitHub Repo
              </a>
            )}
            {hasRealLink && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-xs font-semibold tracking-wider uppercase text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/40 transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
            {!hasRealGithub && !hasRealLink && (
              <span className="text-xs text-white/30 font-mono italic">
                Links coming soon
              </span>
            )}
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </motion.div>
    </motion.div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md p-8 md:p-10 cursor-pointer transition-all duration-500 hover:border-violet-500/20 hover:bg-white/[0.04]"
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

          {/* Short Description */}
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

          {/* Click hint */}
          <div className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase font-semibold text-white/40 group-hover:text-white/70 transition-colors duration-300">
            <span>View Details</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setActiveProject(project)}
            />
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

      {/* Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
