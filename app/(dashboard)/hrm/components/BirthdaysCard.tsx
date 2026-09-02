"use client";

import { useState } from "react";
import { Cake, Sparkles, Loader2, Send, Copy, Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const initialBirthdays = [
  { name: "Sarah Ahmed", date: "Sep 08", role: "Principal UI Architect" },
  { name: "Kamal Hossain", date: "Sep 14", role: "Backend Node Engineer" },
  { name: "Rina Aktar", date: "Sep 22", role: "Talent Operations Lead" },
];

export default function BirthdaysCard() {
  const [selectedEmp, setSelectedEmp] = useState<any>(null);
  const [wish, setWish] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);

  async function generateWish(emp: any) {
    setSelectedEmp(emp);
    setWish("");
    setIsLoading(true);
    try {
      const prompt = `Write a warm, executive, and inspiring birthday wish for ${emp.name}, who works as a ${emp.role} at Injaazh Enterprise ERP. Keep it under 40 words.`;
      const res = await fetch("/api/ai/query", {
        method: "POST",
        body: JSON.stringify({ query: prompt }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setWish(data.text || data.response || `Happy Birthday ${emp.name}! Wishing you extraordinary success and joy in the year ahead with Injaazh ERP.`);
    } catch {
      setWish(`Happy Birthday ${emp.name}! Wishing you another year of outstanding accomplishments and happiness with the Injaazh team.`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSend() {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSending(false);
    setSelectedEmp(null);
    toast.success(`Birthday greetings dispatched to ${selectedEmp?.name}!`);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(wish);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast.success("Copied to clipboard!");
  }

  return (
    <>
      <div className="glass rounded-3xl border border-border/80 p-5 hover:border-gold-500/30 transition-all duration-300 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold-500/10 text-gold-500 flex items-center justify-center">
              <Cake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground font-heading">Upcoming Celebrations</h3>
              <p className="text-[10px] text-muted-foreground">Birthdays & Anniversaries</p>
            </div>
          </div>
          <span className="text-[9px] font-bold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20">
            3 Coming Up
          </span>
        </div>

        <div className="space-y-2.5 pt-1">
          {initialBirthdays.map((item, i) => (
            <div key={i} className="p-3 rounded-2xl bg-card/60 border border-border/60 hover:border-gold-500/30 transition-all flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl gold-gradient flex items-center justify-center font-extrabold text-obsidian-950 text-xs shrink-0">
                  {item.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground group-hover:text-gold-500 transition-colors truncate">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{item.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold text-muted-foreground">{item.date}</span>
                <button
                  onClick={() => generateWish(item)}
                  className="px-2.5 py-1 rounded-xl gold-gradient text-obsidian-950 text-[10px] font-extrabold hover:opacity-90 flex items-center gap-1 shadow-sm transition-transform active:scale-95"
                >
                  <Sparkles className="w-3 h-3" /> Wish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedEmp} onOpenChange={(open) => !open && setSelectedEmp(null)}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-2xl border border-border shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg font-heading text-foreground">
              <Cake className="w-5 h-5 mr-2 text-gold-500" /> Birthday Greeting for {selectedEmp?.name}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Google Gemini synthesized a personalized greeting message.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
                <p className="text-xs text-muted-foreground font-semibold">Composing custom message...</p>
              </div>
            ) : (
              <div className="p-4 bg-background/80 border border-border/80 rounded-2xl">
                <p className="text-xs text-foreground leading-relaxed italic">&ldquo;{wish}&rdquo;</p>
              </div>
            )}
          </div>

          <DialogFooter className="flex items-center justify-between sm:justify-between w-full pt-2 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => generateWish(selectedEmp)}
              className="rounded-xl border-border text-xs"
              disabled={isLoading || isSending}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-gold-500" /> Regenerate
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={copyToClipboard}
                className="rounded-xl text-xs"
                disabled={isLoading || isSending || !wish}
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
              <Button
                size="sm"
                onClick={handleSend}
                className="gold-gradient text-obsidian-900 rounded-xl font-bold text-xs"
                disabled={isLoading || isSending || !wish}
              >
                {isSending ? "Dispatching..." : "Send Greeting"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
