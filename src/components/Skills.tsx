"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Code2, Database, BrainCircuit, Sparkles } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  cat: "aiml" | "backend" | "frontend" | "learning";
  color: string;
  siSlug: string;
  proficiency?: string;
}

const SKILLS: Skill[] = [
  { id: "pytorch",    name: "PyTorch",       cat: "aiml",     color: "#EE4C2C", siSlug: "pytorch" },
  { id: "tensorflow", name: "TensorFlow",    cat: "aiml",     color: "#FF6F00", siSlug: "tensorflow" },
  { id: "hf",         name: "HuggingFace",   cat: "aiml",     color: "#FFD21E", siSlug: "huggingface", proficiency: "Basic" },
  { id: "sklearn",    name: "Scikit-learn",  cat: "aiml",     color: "#F89939", siSlug: "scikitlearn" },
  { id: "deeplearn",  name: "Deep Learning", cat: "aiml",     color: "#a855f7", siSlug: "deepmind" },
  { id: "nlp",        name: "NLP",           cat: "aiml",     color: "#c084fc", siSlug: "spacy" },
  
  { id: "python",     name: "Python",        cat: "backend",  color: "#3B8DD4", siSlug: "python" },
  { id: "fastapi",    name: "FastAPI",       cat: "backend",  color: "#009688", siSlug: "fastapi", proficiency: "Basic" },
  { id: "postgres",   name: "PostgreSQL",    cat: "backend",  color: "#336791", siSlug: "postgresql", proficiency: "Basic" },
  { id: "mongodb",    name: "MongoDB",       cat: "backend",  color: "#4DB33D", siSlug: "mongodb", proficiency: "Basic" },
  { id: "java",       name: "Java",          cat: "backend",  color: "#f89820", siSlug: "openjdk" },
  { id: "sql",        name: "SQL",           cat: "backend",  color: "#6366f1", siSlug: "mysql" },
  
  { id: "html",       name: "HTML5",         cat: "frontend", color: "#E34F26", siSlug: "html5" },
  { id: "css",        name: "CSS3",          cat: "frontend", color: "#264DE4", siSlug: "css" },
  { id: "js",         name: "JavaScript",    cat: "frontend", color: "#F7DF1E", siSlug: "javascript" },
  { id: "angular",    name: "Angular",       cat: "frontend", color: "#DD0031", siSlug: "angular", proficiency: "Basic" },
  
  { id: "langchain",  name: "LangChain",     cat: "learning", color: "#06b6d4", siSlug: "langchain" },
  { id: "agentic",    name: "Agentic AI",    cat: "learning", color: "#22d3ee", siSlug: "robotframework", proficiency: "Basic" },
  { id: "finetuning", name: "Fine-Tuning",   cat: "learning", color: "#67e8f9", siSlug: "ollama" },
];

const CATEGORIES = [
  { id: "frontend", title: "FRONT-END", icon: Code2, color: "text-pink-400", border: "border-pink-500/20", bg: "bg-pink-500/5", shadow: "shadow-pink-500/10" },
  { id: "backend", title: "BACK-END", icon: Database, color: "text-indigo-400", border: "border-indigo-500/20", bg: "bg-indigo-500/5", shadow: "shadow-indigo-500/10" },
  { id: "aiml", title: "CORE MACHINE LEARNING", icon: BrainCircuit, color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/5", shadow: "shadow-purple-500/10" },
  { id: "learning", title: "CURRENTLY LEARNING", icon: Sparkles, color: "text-cyan-400", border: "border-cyan-500/20", bg: "bg-cyan-500/5", shadow: "shadow-cyan-500/10" },
] as const;

function SkillCard({ skill }: { skill: Skill }) {
  const [imgErr, setImgErr] = useState(false);
  const iconUrl = `https://cdn.simpleicons.org/${skill.siSlug}/${skill.color.replace("#", "")}`;

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
    >
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center bg-black/40 border border-white/10 shrink-0"
        style={{ boxShadow: `inset 0 0 10px ${skill.color}20` }}
      >
        {!imgErr ? (
          <img
            src={iconUrl}
            alt={skill.name}
            className="w-5 h-5 object-contain"
            onError={() => setImgErr(true)}
            style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.1))" }}
          />
        ) : (
          <span className="font-mono font-bold text-sm" style={{ color: skill.color }}>
            {skill.name[0]}
          </span>
        )}
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-sm font-medium text-white/80 font-mono tracking-tight truncate">
          {skill.name}
        </span>
        {skill.proficiency && (
          <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest mt-0.5">
            {skill.proficiency}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative z-20 py-24 border-t"
      style={{
        background: "linear-gradient(135deg, #0d0d1a 0%, #08080f 60%, #0a0816 100%)",
        borderColor: "rgba(139,92,246,0.12)",
      }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p
              className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2"
              style={{ color: "rgba(139,92,246,0.55)" }}
            >
              AIML DEVELOPER &middot; SKILL MATRIX v3.0
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-white">
              Skills{" "}
              <span className="font-serif italic font-normal" style={{ color: "rgba(255,255,255,0.55)" }}>
                &amp; Expertise
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="font-mono text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 rounded border"
              style={{ borderColor: "rgba(139,92,246,0.3)", color: "rgba(167,139,250,0.7)", background: "rgba(139,92,246,0.05)" }}
            >
              {SKILLS.length} SKILLS LOADED
            </span>
            <motion.a
              href="/cv.pdf"
              download="Krish_Bavariya_CV.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all"
              style={{ border: "1px solid rgba(139,92,246,0.4)", background: "rgba(139,92,246,0.1)", color: "#c4b5fd" }}
            >
              <Download className="w-3 h-3" />
              Download CV
            </motion.a>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((category, index) => {
            const categorySkills = SKILLS.filter(s => s.cat === category.id);
            const Icon = category.icon;
            
            return (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-3xl border ${category.border} ${category.bg} shadow-lg ${category.shadow} backdrop-blur-sm p-6 lg:p-8 flex flex-col group transition-all duration-500 hover:bg-white/[0.04]`}
              >
                {/* Box Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-black/40 border border-white/10 ${category.color} shadow-inner`}>
                    <Icon className="w-6 h-6 opacity-80" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-light tracking-widest uppercase text-white/90">
                    {category.title}
                  </h3>
                </div>
                
                {/* Skills List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                  {categorySkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
