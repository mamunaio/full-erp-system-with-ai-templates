"use client";

import { useState } from "react";
import { Cake, Sparkles, Loader2, Send, Copy, Check } from "lucide-react";
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

const initialBirthdays = [
  { name: "Sarah Ahmed", date: "May 20", role: "UI Designer" },
  { name: "Kamal Hossain", date: "May 24", role: "Backend Dev" },
  { name: "Rina Aktar", date: "June 02", role: "HR Associate" },
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
      const prompt = `Write a professional, warm, and creative birthday wish for ${emp.name}, who works as a ${emp.role} at our company 'Injaazh ERP'. Keep it under 50 words.`;
      const res = await fetch("/api/ai/query", {
        method: "POST",
        body: JSON.stringify({ query: prompt }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setWish(data.text || data.response);
    } catch {
      setWish("Happy Birthday! Wishing you a great year ahead with Injaazh ERP.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSend() {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSending(false);
    setSelectedEmp(null);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(wish);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  return (
    <>
      <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-card-foreground font-heading flex items-center">
            <Cake className="w-4 h-4 mr-2 text-gold-400" /> Upcoming Birthdays
          </h3>
        </div>
        <div className="space-y-4">
          {initialBirthdays.map((item, i) => (
            <div key={i} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center font-bold text-gold-400 border border-gold-500/20 shrink-0">
                {item.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-card-foreground truncate">{item.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{item.role}</p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <p className="text-xs font-bold text-gold-400 mb-1">{item.date}</p>
                <button
                  onClick={() => generateWish(item)}
                  className="opacity-0 group-hover:opacity-100 transition-all text-[10px] bg-gold-500 text-obsidian-900 px-2 py-1 rounded-md flex items-center hover:bg-gold-600 font-bold"
                >
                  <Sparkles className="w-3 h-3 mr-1" /> Wish
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link href="/hrm/calendar">
          <Button className="w-full mt-5 bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 border border-gold-500/20 rounded-xl h-10 text-xs font-bold transition-all active:scale-95">
            View Calendar
          </Button>
        </Link>
      </div>

      <Dialog open={!!selectedEmp} onOpenChange={(open) => !open && setSelectedEmp(null)}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-2xl border border-border shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-heading">
              <Cake className="w-6 h-6 mr-2 text-gold-400" /> Birthday Wish for {selectedEmp?.name}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              AI has generated a custom wish for your employee.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-gold-400" />
                <p className="text-sm text-muted-foreground">Creating a special wish...</p>
              </div>
            ) : (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 to-gold-400/20 rounded-2xl blur opacity-30" />
                <div className="relative p-6 bg-card border border-border rounded-2xl">
                  <p className="text-card-foreground italic leading-relaxed">&ldquo;{wish}&rdquo;</p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex items-center justify-between sm:justify-between w-full">
            <Button
              variant="outline"
              onClick={() => generateWish(selectedEmp)}
              className="rounded-xl border-border"
              disabled={isLoading || isSending}
            >
              <Sparkles className="w-4 h-4 mr-2 text-gold-400" /> Regenerate
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={copyToClipboard}
                className="rounded-xl"
                disabled={isLoading || isSending || !wish}
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button
                onClick={handleSend}
                className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-xl min-w-[120px] font-bold"
                disabled={isLoading || isSending || !wish}
              >
                {isSending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                ) : (
                  <><Send className="w-4 h-4 mr-2" /> Send Wish</>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
