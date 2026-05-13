"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, Sparkles, Trash2, 
  Settings2, Paperclip, Mic,
  Maximize2, Copy, ThumbsUp,
  ThumbsDown, Bot, User,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAIStore } from "@/store/ai.store";
import ResponseRenderer from "./ResponseRenderer";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-col h-[calc(100vh-180px)] max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center space-x-4">
           <div className="w-12 h-12 rounded-[20px] bg-gradient-to-tr from-injaazh-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-injaazh-600/30">
              <Sparkles className="w-6 h-6" />
           </div>
           <div>
              <h2 className="text-lg font-black italic tracking-tighter uppercase leading-none">Injaazh AI Hub</h2>
              <div className="flex items-center space-x-1.5 mt-1">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Central Intelligence Active</span>
              </div>
           </div>
        </div>
        <div className="flex items-center space-x-2">
           <div className="relative group">
              <button className="flex items-center space-x-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:border-injaazh-200 transition-colors">
                 <span>Context: {activeModule}</span>
                 <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl p-2 hidden group-hover:block z-50">
                 {modules.map(m => (
                   <button 
                    key={m} 
                    onClick={() => setActiveModule(m)}
                    className={cn(
                      "w-full text-left px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
                      activeModule === m ? "text-injaazh-600 bg-injaazh-50" : "text-slate-500"
                    )}
                   >
                     {m}
                   </button>
                 ))}
              </div>
           </div>
           <Button variant="ghost" size="icon" onClick={clearHistory} className="h-10 w-10 text-slate-400 hover:text-rose-500 rounded-xl">
             <Trash2 className="w-5 h-5" />
           </Button>
           <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 rounded-xl">
             <Settings2 className="w-5 h-5" />
           </Button>
        </div>
      </div>

      {/* History */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
             <div className="w-24 h-24 rounded-[32px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300">
                <Bot className="w-12 h-12" />
             </div>
             <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Hello! I'm your Injaazh ERP assistant.</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-sm">Ask me anything about your business, from financial forecasts to employee attendance.</p>
             </div>
             <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {["এই মাসের প্রফিট কত?", "কোন এমপ্লয়ি আজকে ছুটিতে?", "স্টক আউট হওয়ার সম্ভাবনা আছে?"].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setInput(s)}
                    className="px-4 py-2 rounded-full border border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-500 hover:border-injaazh-600 hover:text-injaazh-600 transition-all bg-white dark:bg-slate-900"
                  >
                    {s}
                  </button>
                ))}
             </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={cn(
            "flex space-x-4 animate-in slide-in-from-bottom-4 duration-500",
            msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
          )}>
            <div className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
              msg.role === "user" ? "bg-slate-900 text-white" : "bg-white dark:bg-slate-800 text-injaazh-600"
            )}>
              {msg.role === "user" ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div className={cn(
              "max-w-[80%] space-y-2",
              msg.role === "user" ? "text-right" : ""
            )}>
              <div className={cn(
                "p-5 rounded-[28px] shadow-sm",
                msg.role === "user" ? "bg-injaazh-600 text-white" : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white"
              )}>
                <ResponseRenderer type={msg.type} content={msg.content} />
              </div>
              <div className="flex items-center space-x-3 px-2">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </span>
                 {msg.role === "assistant" && (
                   <div className="flex items-center space-x-2">
                      <button className="text-slate-300 hover:text-injaazh-600 transition-colors"><ThumbsUp className="w-3 h-3" /></button>
                      <button className="text-slate-300 hover:text-rose-500 transition-colors"><ThumbsDown className="w-3 h-3" /></button>
                      <button className="text-slate-300 hover:text-slate-600 transition-colors"><Copy className="w-3 h-3" /></button>
                   </div>
                 )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex space-x-4 animate-pulse">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800" />
            <div className="space-y-2 flex-1">
               <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-[28px] w-2/3" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md">
        <div className="relative flex items-end space-x-4">
           <div className="flex-1 relative">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="Ask AI anything about your business..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] py-4 pl-14 pr-14 text-sm focus:ring-4 focus:ring-injaazh-500/10 outline-none shadow-xl min-h-[60px] max-h-[120px] resize-none transition-all"
              />
              <button className="absolute left-4 bottom-3.5 p-2 text-slate-400 hover:text-injaazh-600 transition-colors">
                 <Paperclip className="w-5 h-5" />
              </button>
              <button className="absolute right-4 bottom-3.5 p-2 text-slate-400 hover:text-injaazh-600 transition-colors">
                 <Mic className="w-5 h-5" />
              </button>
           </div>
           <Button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-14 h-14 rounded-2xl bg-injaazh-600 hover:bg-injaazh-700 text-white shadow-xl shadow-injaazh-600/30 shrink-0 transition-transform active:scale-95"
           >
             <Send className="w-6 h-6" />
           </Button>
        </div>
        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
          Ctrl + Enter to send • InjaazhAI may provide inaccurate data, please verify critical information.
        </p>
      </div>
    </div>
  );
}
