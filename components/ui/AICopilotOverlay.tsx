"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AICopilotOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-2xl bg-gradient-to-r from-injaazh-600 to-indigo-600 hover:from-injaazh-700 hover:to-indigo-700 border-none flex items-center justify-center p-0"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </Button>
      </motion.div>

      {/* AI Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            className="fixed bottom-24 right-6 w-[380px] h-[550px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-injaazh-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-injaazh-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Injaazh AI</h3>
                  <p className="text-[10px] text-injaazh-600 dark:text-injaazh-400 font-semibold uppercase tracking-wider">Enterprise Copilot</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                <X className="w-5 h-5 text-slate-500" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-950 flex flex-col space-y-4">
              <div className="self-start max-w-[85%] bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-700 shadow-sm">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Hello! I am your Injaazh Enterprise Copilot. How can I assist you with your operations today?
                </p>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl px-3 py-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-injaazh-600 hover:bg-injaazh-100 dark:hover:bg-slate-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
