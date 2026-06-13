import ScrollyCanvas from "@/components/ScrollyCanvas";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#121212] text-white">
      {/* Premium Minimal Navbar */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto select-none">
          <a href="#" className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-white hover:opacity-80 transition-opacity">
            Krish Bavariya // AI·ML
          </a>
        </div>

        <nav className="pointer-events-auto flex items-center gap-4">
          <a
            href="#skills"
            className="text-[10px] uppercase font-mono tracking-widest text-white/50 hover:text-white/90 transition-colors hidden md:block"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="text-[10px] uppercase font-mono tracking-widest text-white/50 hover:text-white/90 transition-colors hidden md:block"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-[10px] uppercase font-mono tracking-widest bg-white/5 border border-white/10 hover:border-white/20 transition-all rounded-full px-4 py-1.5 backdrop-blur-md"
          >
            Connect
          </a>
        </nav>
      </header>

      {/* Main Content Sections */}
      <main>
        {/* Scroll Linked Animation Section (500vh track) */}
        <ScrollyCanvas />

        {/* Skills Section */}
        <Skills />

        {/* Selected Work Grid Section */}
        <Projects />
      </main>

      {/* Modern Minimal Footer */}
      <footer className="relative z-20 bg-[#121212] py-16 border-t border-white/5 text-center text-xs font-light text-white/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Krish Bavariya. All rights reserved.</p>
          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-wider">
            <a href="#" className="hover:text-white/60 transition-colors">Twitter</a>
            <a href="#" className="hover:text-white/60 transition-colors">GitHub</a>
            <a href="#" className="hover:text-white/60 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Interactive Contact Modal */}
      <ContactModal />
    </div>
  );
}
