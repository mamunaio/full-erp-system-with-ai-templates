"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-injaazh-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
        >
          <Sparkles className="w-4 h-4 text-injaazh-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-injaazh-400">AI-Native Enterprise Solution</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] mb-8"
        >
          The <span className="text-injaazh-500">AI-Native</span> ERP <br />
          That Runs Your Business
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg text-slate-400 mb-12 leading-relaxed"
        >
          12 integrated modules + Gemini AI that predicts, automates, and advises. 
          Built for modern enterprises who want to scale faster with intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6"
        >
          <Button className="h-16 px-10 rounded-2xl bg-injaazh-600 hover:bg-injaazh-700 text-white font-black italic tracking-tighter uppercase text-xl shadow-2xl shadow-injaazh-600/40 group">
            View Live Demo <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="ghost" className="h-16 px-10 rounded-2xl border border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest text-sm">
            <Play className="mr-3 w-5 h-5 fill-current" /> Watch Showreel
          </Button>
        </motion.div>

        {/* Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 relative max-w-6xl mx-auto"
        >
          <div className="relative rounded-[40px] border-8 border-white/5 overflow-hidden shadow-[0_0_100px_rgba(79,70,229,0.2)] bg-slate-900">
             <div className="aspect-[16/9] bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-center space-y-4">
                   <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                      <Sparkles className="w-12 h-12 text-injaazh-400" />
                   </div>
                   <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Interactive Dashboard Preview</p>
                </div>
             </div>
             {/* Floating UI elements */}
             <div className="absolute top-10 left-10 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl animate-bounce-slow">
                <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white"><CheckCircle2 className="w-4 h-4" /></div>
                   <div className="text-left"><p className="text-[10px] font-bold uppercase text-slate-300">Revenue Up</p><p className="text-sm font-black">+24.5%</p></div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
