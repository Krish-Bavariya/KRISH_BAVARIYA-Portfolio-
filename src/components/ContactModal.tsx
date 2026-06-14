"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Send, Loader2 } from "lucide-react";


export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Listen to hash changes in URL to open/close modal
  useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(window.location.hash === "#contact");
    };

    // Initial check
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const closeModal = () => {
    // Reset states
    setIsOpen(false);
    setStatus("idle");
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    
    // Clear URL hash without reloading page
    if (window.location.hash === "#contact") {
      window.history.pushState(null, "", window.location.pathname + window.location.search);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 p-8 shadow-2xl backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="font-mono text-[9px] tracking-[0.25em] text-violet-400 uppercase">
                  Let's Connect
                </span>
                <h3 className="text-2xl font-light tracking-tight text-white mt-1">
                  Start a Conversation
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="rounded-full border border-white/5 bg-white/5 p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content States */}
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-6" />
                  </motion.div>
                  <h4 className="text-xl font-light tracking-tight text-white mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-white/50 font-light leading-relaxed max-w-sm mb-8">
                    Thanks for reaching out, {formData.name}. I've received your request and will get back to you as soon as possible.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeModal}
                    className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors duration-200"
                  >
                    Close
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      disabled={status === "sending"}
                      className={`w-full rounded-lg border px-4 py-3 text-sm font-light text-white bg-white/5 placeholder-white/20 transition-all outline-none ${
                        errors.name
                          ? "border-red-500/50 focus:border-red-500 bg-red-500/5"
                          : "border-white/10 focus:border-violet-500/50 focus:bg-white/10"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[10px] font-mono text-red-400 mt-1 block">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="hello@example.com"
                      disabled={status === "sending"}
                      className={`w-full rounded-lg border px-4 py-3 text-sm font-light text-white bg-white/5 placeholder-white/20 transition-all outline-none ${
                        errors.email
                          ? "border-red-500/50 focus:border-red-500 bg-red-500/5"
                          : "border-white/10 focus:border-violet-500/50 focus:bg-white/10"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[10px] font-mono text-red-400 mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell me about your project..."
                      disabled={status === "sending"}
                      className={`w-full rounded-lg border px-4 py-3 text-sm font-light text-white bg-white/5 placeholder-white/20 transition-all outline-none resize-none ${
                        errors.message
                          ? "border-red-500/50 focus:border-red-500 bg-red-500/5"
                          : "border-white/10 focus:border-violet-500/50 focus:bg-white/10"
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[10px] font-mono text-red-400 mt-1 block">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Action Row */}
                  <div className="pt-2 space-y-3">
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={status === "sending" ? {} : { scale: 1.02 }}
                      whileTap={status === "sending" ? {} : { scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 text-white text-xs font-semibold uppercase tracking-widest hover:bg-violet-500 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-violet-900/20"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                    {status === "error" && (
                      <p className="text-center text-xs text-red-400 font-mono">
                        ⚠ Failed to send. Please try again or email me directly.
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
