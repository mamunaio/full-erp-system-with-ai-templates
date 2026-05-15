"use client";

import { useState } from "react";
import { Cake, Sparkles, Loader2, Send, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  async function generateWish(emp: any) {
    setSelectedEmp(emp);
    setWish("");
    setIsLoading(true);

    try {
      const prompt = `Write a professional, warm, and creative birthday wish for ${emp.name}, who works as a ${emp.role} at our company 'Injaazh ERP'. Keep it under 50 words.`;
      const res = await fetch("/api/ai/query", {
        method: "POST",
        body: JSON.stringify({ query: prompt }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      setWish(data.text || data.response);
    } catch (err) {
      setWish("Happy Birthday! Wishing you a great year ahead with Injaazh ERP.");
    } finally {
      setIsLoading(false);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(wish);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  return (
    <>
      <Card className="border-none shadow-md bg-white dark:bg-slate-900">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center">
              <Cake className="w-5 h-5 mr-2 text-rose-500" /> Upcoming Birthdays
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {initialBirthdays.map((item, i) => (
              <div key={i} className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-injaazh-50 dark:bg-injaazh-900/30 flex items-center justify-center font-bold text-injaazh-600 border border-injaazh-100 dark:border-injaazh-900/50">
                  {item.name[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{item.role}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xs font-bold text-rose-500 mb-1">{item.date}</p>
                  <button 
                    onClick={() => generateWish(item)}
                    className="opacity-0 group-hover:opacity-100 transition-all text-[10px] bg-injaazh-600 text-white px-2 py-1 rounded-md flex items-center hover:bg-injaazh-700"
                  >
                    <Sparkles className="w-3 h-3 mr-1" /> Wish
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-8 bg-slate-100 hover:bg-injaazh-100 text-slate-900 hover:text-injaazh-700 dark:bg-slate-800 dark:text-white border-none rounded-xl focus:ring-2 focus:ring-injaazh-500 transition-all">
            View Calendar
          </Button>
        </CardContent>
      </Card>

      <Dialog open={!!selectedEmp} onOpenChange={(open) => !open && setSelectedEmp(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <Cake className="w-6 h-6 mr-2 text-rose-500" /> Birthday Wish for {selectedEmp?.name}
            </DialogTitle>
            <DialogDescription>
              AI has generated a custom wish for your employee.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-injaazh-600" />
                <p className="text-sm text-slate-500">Creating a special wish...</p>
              </div>
            ) : (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-injaazh-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl">
                  <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    "{wish}"
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-row space-x-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => generateWish(selectedEmp)}
              className="rounded-xl"
              disabled={isLoading}
            >
              <Sparkles className="w-4 h-4 mr-2 text-injaazh-600" /> Regenerate
            </Button>
            <Button
              onClick={copyToClipboard}
              className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl min-w-[120px]"
              disabled={isLoading}
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 mr-2" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" /> Copy Wish
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
