"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, Sparkles, Trash2, 
  Settings2, Paperclip, Mic,
  Copy, ThumbsUp,
  ThumbsDown, Bot, User,
  ChevronDown,
  Loader2,
  Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAIStore } from "@/store/ai.store";
import ResponseRenderer from "./ResponseRenderer";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AIChat() {
  const { messages, activeModule, setActiveModule, addMessage, clearHistory, isLoading, setLoading } = useAIStore();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const modules = ["ALL", "FINANCE", "HR", "INVENTORY", "SALES"];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
      type: "text" as const,
      timestamp: new Date()
    };

    addMessage(userMsg);
    setInput("");
    setLoading(true);

    try {
      // Simulate API delay for premium feel if no real API is connected
      const res = await fetch("/api/ai/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input, module: activeModule })
      });
      
      const data = await res.json();
      
      const aiContent = data.error 
        ? `Error: ${data.error}` 
        : (data.text || (typeof data === 'string' ? data : JSON.stringify(data)));

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: aiContent,
        type: data.type || "text",
        timestamp: new Date()
      };
      
      addMessage(aiMsg);
    } catch (error) {
      console.error("Chat Error:", error);
      toast.error("AI node connection failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-transparent relative animate-in fade-in zoom-in duration-500">
      {/* Internal Chat Header */}
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl z-10">
        <div className="flex items-center space-x-5">
           <div className="w-12 h-12 rounded-[22px] bg-slate-950 flex items-center justify-center text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-600/20 animate-pulse" />
              <Sparkles className="w-6 h-6 relative z-10" />
           </div>
           <div>
              <h2 className="text-xl font-black italic tracking-tighter uppercase leading-none text-slate-900 dark:text-white">Injaazh <span className="text-blue-600">AI Node</span></h2>
              <div className="flex items-center space-x-2 mt-1.5">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Link Established</span>
              </div>
           </div>
        </div>
        <div className="flex items-center space-x-4">
           <div className="relative group">
              <button className="flex items-center space-x-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:border-blue-600 transition-all shadow-sm">
                 <span className="text-slate-400">Context:</span>
                 <span className="text-blue-600">{activeModule}</span>
                 <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
              </button>
              <div className="absolute right-0 top-full mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[28px] shadow-2xl p-3 hidden group-hover:block z-50 animate-in slide-in-from-top-2">
                 {modules.map(m => (
                   <button 
                    key={m} 
                    onClick={() => setActiveModule(m)}
                    className={cn(
                      "w-full text-left px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all mb-1",
                      activeModule === m ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20" : "text-slate-500"
                    )}
                   >
                     {m}
                   </button>
                 ))}
              </div>
           </div>
           <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => { clearHistory(); toast.info("Neural history cleared."); }} 
            className="h-11 w-11 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-2xl transition-all"
           >
             <Trash2 className="w-5 h-5" />
           </Button>
        </div>
      </div>

      {/* Message History */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 scroll-smooth custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-1000">
             <div className="w-24 h-24 rounded-[40px] bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-300 relative group">
                <div className="absolute inset-0 bg-blue-600/5 rounded-[40px] scale-150 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Bot className="w-12 h-12 relative z-10" />
             </div>
             <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">Initiating <span className="text-blue-600">Cognitive Hub</span></h3>
                <p className="text-slate-400 text-sm font-medium mt-2 max-w-sm mx-auto leading-relaxed">System ready for cross-module analysis. How can Injaazh Assist help you today?</p>
             </div>
             <div className="flex flex-wrap justify-center gap-3 max-w-xl">
                {["এই মাসের প্রফিট কত?", "কোন এমপ্লয়ি আজকে ছুটিতে?", "স্টক আউট হওয়ার সম্ভাবনা আছে?", "প্রোজেক্ট টাইমলাইন চেক করো"].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setInput(s)}
                    className="px-6 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-[11px] font-black uppercase tracking-tight text-slate-500 hover:border-blue-600 hover:text-blue-600 hover:shadow-xl transition-all bg-white dark:bg-slate-950 shadow-sm active:scale-95"
                  >
                    {s}
                  </button>
                ))}
             </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={cn(
            "flex space-x-6 animate-in slide-in-from-bottom-4 duration-500",
            msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
          )}>
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xl transition-transform hover:scale-110",
              msg.role === "user" ? "bg-slate-900 text-white" : "bg-white dark:bg-slate-950 text-blue-600 border border-slate-100 dark:border-slate-800"
            )}>
              {msg.role === "user" ? <User className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
            </div>
            <div className={cn(
              "max-w-[75%] space-y-3",
              msg.role === "user" ? "text-right" : ""
            )}>
              <div className={cn(
                "p-6 rounded-[32px] shadow-sm leading-relaxed",
                msg.role === "user" 
                  ? "bg-blue-600 text-white font-medium shadow-blue-600/20" 
                  : "bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white shadow-xl"
              )}>
                <ResponseRenderer type={msg.type} content={msg.content} />
              </div>
              <div className={cn("flex items-center space-x-4 px-2", msg.role === "user" ? "flex-row-reverse space-x-reverse" : "")}>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-50">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </span>
                 {msg.role === "assistant" && (
                   <div className="flex items-center space-x-3">
                      <button className="text-slate-300 hover:text-blue-600 transition-colors p-1"><ThumbsUp className="w-3.5 h-3.5" /></button>
                      <button className="text-slate-300 hover:text-rose-500 transition-colors p-1"><ThumbsDown className="w-3.5 h-3.5" /></button>
                      <button className="text-slate-300 hover:text-slate-600 transition-colors p-1"><Copy className="w-3.5 h-3.5" /></button>
                   </div>
                 )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex space-x-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
               <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            </div>
            <div className="space-y-2 flex-1">
               <div className="h-16 bg-slate-50 dark:bg-slate-950 rounded-[32px] w-2/3 border border-slate-100 dark:border-slate-800 animate-pulse flex items-center px-6">
                  <div className="flex space-x-1.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Premium Input Bar */}
      <div className="p-10 border-t border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto relative flex items-end space-x-5">
           <div className="flex-1 relative">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="Ask AI anything about your business..."
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[32px] py-6 pl-16 pr-16 text-sm font-medium focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600/50 outline-none shadow-2xl min-h-[76px] max-h-[160px] resize-none transition-all placeholder:text-slate-400"
              />
              <button className="absolute left-6 bottom-5 p-2 text-slate-400 hover:text-blue-600 transition-all hover:scale-110 active:scale-95">
                 <Paperclip className="w-6 h-6" />
              </button>
              <button className="absolute right-6 bottom-5 p-2 text-slate-400 hover:text-blue-600 transition-all hover:scale-110 active:scale-95">
                 <Mic className="w-6 h-6" />
              </button>
           </div>
           <Button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-16 h-16 rounded-[28px] bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-600/30 shrink-0 transition-all active:scale-90"
          >
             {isLoading ? <Loader2 className="w-7 h-7 animate-spin" /> : <Send className="w-7 h-7" />}
           </Button>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-6">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-60">
             CTRL + ENTER to send
           </p>
           <div className="w-1 h-1 rounded-full bg-slate-300" />
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-60">
             End-to-end encrypted
           </p>
           <div className="w-1 h-1 rounded-full bg-slate-300" />
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-60">
             L40-v3 Cluster Active
           </p>
        </div>
      </div>
    </div>
  );
}
