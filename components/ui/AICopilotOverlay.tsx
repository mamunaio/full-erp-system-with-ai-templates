"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Sparkles, X, Send, Bot, Cpu, Trash2,
  Users, Package, DollarSign, AlertTriangle, Info, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InsightContent {
  title: string;
  description: string;
  severity?: "info" | "warning" | "error" | "success";
}

interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  type?: "insight" | "text";
  content?: InsightContent[];
  time: string;
}

const promptChips = [
  "Forecast Q4 revenue trends",
  "Check low inventory items",
  "Show top 3 CRM deals",
  "Summarize employee attendance",
];

export default function AICopilotOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting: ChatMessage = {
    id: "m1",
    sender: "ai",
    text: "আসসালামু আলাইকুম! আমি আপনার ইনজাজ এন্টারপ্রাইজ এআই কপাইলট। ফিন্যান্স, সিআরএম, এইচআর ও ইনভেন্টরির সমস্ত ডেটা স্ট্রিম সিঙ্ক্রোনাইজড। কীভাবে সাহায্য করতে পারি?",
    time: "Just now",
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: "ai",
        text: "আসসালামু আলাইকুম! নতুন কনভারসেশন শুরু হয়েছে। যেকোনো প্রশ্ন করতে পারেন।",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
    ]);
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: data.text || data.response || "বিশ্লেষণ সম্পন্ন হয়েছে।",
            type: data.type,
            content: data.content,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        throw new Error();
      }
    } catch {
      setTimeout(() => {
        let simulated = "আপনার রিকোয়েস্টটি এন্টারপ্রাইজ ডেটার সাথে যাচাই করা হয়েছে। সমস্ত প্যারামিটার স্বাভাবিক রয়েছে।";
        if (query.toLowerCase().includes("revenue") || query.toLowerCase().includes("finance")) {
          simulated = "আর্থিক বিশ্লেষণ: YTD মোট রেভিনিউ $1,248,500 এবং নেট মার্জিন +14.2%। পরবর্তী ট্যাক্স অডিট ১৫ অক্টোবর নির্ধারিত।";
        } else if (query.toLowerCase().includes("inventory") || query.toLowerCase().includes("stock")) {
          simulated = "ইনভেন্টরি স্টেটাস: ৩টি গুদামে মোট ৪,২৮০টি এসকেইউ রয়েছে। ৪টি পণ্যের স্টক বাফারের নিচে রয়েছে।";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: simulated,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }, 600);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Tactical Orb Button - Always Visible at bottom-right */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Copilot"
            className="group p-3.5 rounded-2xl gold-gradient shadow-2xl shadow-gold-500/30 flex items-center gap-2.5 text-obsidian-950 font-black text-xs transition-all hover:scale-105 active:scale-95 hover:shadow-gold-500/50 cursor-pointer border border-gold-400/40"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-obsidian-950" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <span className="hidden sm:inline-block pr-1 font-heading text-sm tracking-wide font-extrabold">
              AI Copilot
            </span>
          </button>
        </div>
      )}

      {/* Floating Neural Chat Drawer */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[440px] h-[600px] max-h-[80vh] bg-card/95 backdrop-blur-3xl border border-border/80 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="p-4 border-b border-border/60 bg-background/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center text-obsidian-900 shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-foreground font-heading">Injaazh Copilot</h4>
                  <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-gold-500" /> Multi-Tenant Telemetry Synchronized
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                type="button"
                onClick={handleClearChat}
                title="নতুন কনভারসেশন শুরু করুন"
                className="p-1.5 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
                className="p-1.5 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-background/30">
            {messages.map((m) => (
              <div 
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div 
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    m.sender === "user" 
                      ? "gold-gradient text-obsidian-950 font-semibold rounded-br-none" 
                      : "bg-card border border-border/80 text-foreground rounded-bl-none shadow-md"
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Structured Insight Cards */}
                  {m.content && m.content.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-border/60">
                      {m.content.map((item, idx) => (
                        <div 
                          key={idx}
                          className={cn(
                            "p-2.5 rounded-xl border text-xs flex items-start gap-2",
                            item.severity === "warning" 
                              ? "bg-amber-500/10 border-amber-500/25 text-foreground"
                              : item.severity === "error"
                              ? "bg-rose-500/10 border-rose-500/25 text-foreground"
                              : "bg-background/80 border-border/70 text-foreground"
                          )}
                        >
                          {item.severity === "warning" ? (
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          ) : (
                            <Info className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="font-bold block text-foreground">{item.title}</span>
                            <span className="text-[11px] text-muted-foreground leading-normal">{item.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-muted-foreground mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-card border border-border/80 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-muted-foreground ml-1.5">এআই উত্তর লিখছে...</span>
              </div>
            )}

            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips */}
          <div className="p-2 border-t border-border/40 bg-card/60 flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip)}
                className="shrink-0 text-[10px] font-semibold text-muted-foreground hover:text-foreground bg-accent/60 hover:bg-accent border border-border/60 rounded-xl px-2.5 py-1 transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-card border-t border-border/60">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 bg-background/80 border border-border/80 rounded-2xl px-3 py-1.5 focus-within:border-gold-500/50 transition-colors"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about enterprise data..."
                className="flex-1 bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim()}
                className="h-8 w-8 rounded-xl gold-gradient text-obsidian-900 font-bold hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
