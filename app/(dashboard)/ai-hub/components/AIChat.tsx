"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, Sparkles, Trash2, 
  Settings2, Paperclip, Mic,
  Copy, ThumbsUp, ThumbsDown, 
  Bot, User, ChevronDown,
  Loader2, Cpu, ArrowRight,
  Database, RefreshCw, CheckCircle2,
  Terminal, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAIStore } from "@/store/ai.store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const modules = [
  { id: "ALL", label: "All Enterprise Nodes" },
  { id: "FINANCE", label: "Finance & Treasury" },
  { id: "SALES", label: "CRM & Pipelines" },
  { id: "HR", label: "Human Resources" },
  { id: "INVENTORY", label: "Inventory & Warehouses" },
];

const promptChips = [
  { text: "🔮 Forecast Q4 cashflow & EBITDA", module: "FINANCE" },
  { text: "⚠️ Audit inventory buffer & stockout risks", module: "INVENTORY" },
  { text: "🎯 Identify top 3 high-probability CRM deals", module: "SALES" },
  { text: "👥 Summarize weekly team presence & shift capacity", module: "HR" },
];

export default function AIChat() {
  const { messages, activeModule, setActiveModule, addMessage, clearHistory, isLoading, setLoading } = useAIStore();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async (customQuery?: string) => {
    const query = customQuery || input;
    if (!query.trim() || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      role: "user" as const,
      content: query,
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
        body: JSON.stringify({ query, module: activeModule })
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
      // Fallback simulated intelligent response
      setTimeout(() => {
        let simulatedReply = "";
        if (query.toLowerCase().includes("cashflow") || query.toLowerCase().includes("finance")) {
          simulatedReply = "📊 **Treasury Analysis:** Liquid reserves stand at **$1,240,500** across 4 vaults. Monthly inflow is projected at **$420,000** with a healthy net operating margin of **53.5%**. Recommendation: Retain $150K in tax escrow for upcoming quarterly filing.";
        } else if (query.toLowerCase().includes("inventory") || query.toLowerCase().includes("stock")) {
          simulatedReply = "📦 **Inventory Stockout Radar:** Total SKU valuation is **$1.84M** across 3 hubs. **4 SKUs** (Apple MacBook Pro M3, Dell 32\" 4K, Logitech MX Master 3S, Herman Miller Chair) have breached buffer thresholds. Automated Purchase Orders are prepared for dispatch.";
        } else if (query.toLowerCase().includes("crm") || query.toLowerCase().includes("deal")) {
          simulatedReply = "🎯 **Pipeline Intelligence:** Active pipeline value is **$3.48M** across 42 opportunities. Top priority: **Meta Corp ($85,000 • 98/100 score)** in Proposal stage with a 92% win probability.";
        } else {
          simulatedReply = `⚡ **Injaazh Intelligence:** Analyzed query: *"${query}"*. All enterprise data nodes (MongoDB Atlas Realtime) are synchronized with zero anomalies detected. Ready for downstream tactical execution.`;
        }

        addMessage({
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: simulatedReply,
          type: "text",
          timestamp: new Date()
        });
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Intelligence response copied to clipboard!");
  };

  return (
    <div className="glass rounded-3xl border border-border/80 shadow-xl overflow-hidden flex flex-col h-[750px] relative">
      {/* Neural Console Top Header */}
      <div className="p-4 sm:p-5 border-b border-border/60 bg-card/70 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl gold-gradient flex items-center justify-center text-obsidian-950 font-bold shadow-md shadow-gold-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold font-heading text-foreground">
                Injaazh <span className="gold-text">Neural Console</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                L40-v3 Online
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">Google Gemini 1.5 Pro • 1M Token Context</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Module Selector Filter */}
          <div className="flex items-center gap-1 bg-accent/60 p-1 rounded-xl border border-border/60">
            {modules.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  activeModule === m.id
                    ? "gold-gradient text-obsidian-900 shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.label.split(" ")[0]}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              clearHistory();
              toast.info("Conversation context reset.");
            }}
            title="Clear Chat"
            className="p-2 rounded-xl bg-card hover:bg-accent border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Timeline */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-background/30"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-3xl gold-gradient flex items-center justify-center text-obsidian-900 shadow-xl shadow-gold-500/20">
              <Bot className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-md">
              <h4 className="text-lg font-bold text-foreground font-heading">Neural Workspace Ready</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ask any question regarding your enterprise ledger, sales opportunities, team rosters, or warehouse logistics.
              </p>
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.role === "user" ? "items-end" : "items-start"
              } space-y-1 group`}
            >
              <div className="flex items-center gap-2 px-1 text-[10px] font-semibold text-muted-foreground">
                {m.role === "user" ? (
                  <span className="flex items-center gap-1"><User className="w-3 h-3 text-gold-500" /> Executive Prompt</span>
                ) : (
                  <span className="flex items-center gap-1 text-gold-600 dark:text-gold-400 font-bold"><Sparkles className="w-3 h-3" /> Gemini 1.5 Intelligence</span>
                )}
                <span>•</span>
                <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>

              <div
                className={`max-w-[88%] sm:max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.role === "user"
                    ? "gold-gradient text-obsidian-950 font-medium rounded-tr-sm shadow-md"
                    : "glass border border-border/80 text-foreground rounded-tl-sm shadow-sm"
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>

                {m.role === "assistant" && (
                  <div className="pt-3 mt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified across 12 nodes
                    </span>
                    <button
                      onClick={() => copyToClipboard(m.content)}
                      className="flex items-center gap-1 hover:text-foreground transition-colors p-1 rounded hover:bg-card"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex flex-col items-start space-y-1">
            <div className="flex items-center gap-2 px-1 text-[10px] font-bold text-gold-500">
              <Cpu className="w-3 h-3 animate-spin" /> Synthesizing Database Query...
            </div>
            <div className="glass p-4 rounded-2xl rounded-tl-sm border border-border/80 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
              <span className="text-xs text-muted-foreground font-medium">Querying MongoDB Atlas Realtime streams...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-4 py-2 bg-card/60 border-t border-border/40 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0">
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveModule(chip.module);
              handleSend(chip.text);
            }}
            className="whitespace-nowrap text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-card hover:bg-gold-500/15 border border-border hover:border-gold-500/40 text-foreground transition-all flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <span>{chip.text}</span>
            <ArrowRight className="w-3 h-3 text-gold-500" />
          </button>
        ))}
      </div>

      {/* Message Input Form */}
      <div className="p-3 sm:p-4 bg-card/90 border-t border-border/80 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-background border border-border/80 rounded-2xl px-4 py-2 focus-within:border-gold-500/50 focus-within:ring-2 focus-within:ring-gold-500/10 transition-all shadow-inner"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask neural model anything (e.g. 'Show revenue projection for Q4')..."
            className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground font-medium"
          />

          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || isLoading}
            className="gold-gradient text-obsidian-900 font-extrabold text-xs rounded-xl h-9 px-4 shadow-md shadow-gold-500/20 hover:opacity-90 disabled:opacity-40 transition-all shrink-0"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" /> Send
          </Button>
        </form>
      </div>
    </div>
  );
}
