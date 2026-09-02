"use client";

import { useState } from "react";
import { 
  ChevronRight, ChevronDown, FolderOpen, 
  FileText, Plus, MoreVertical, Landmark, Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const initialCOA = [
  { id: "1", code: "1000", name: "Current & Fixed Assets", type: "ASSET", balance: 1840500, children: [
    { id: "1.1", code: "1100", name: "Liquid Cash & Treasury Vaults", type: "ASSET", balance: 1240500 },
    { id: "1.2", code: "1200", name: "Accounts Receivable (AR)", type: "ASSET", balance: 245000 },
    { id: "1.3", code: "1300", name: "Physical Warehouses Inventory", type: "ASSET", balance: 355000 },
  ]},
  { id: "2", code: "2000", name: "Current & Long-Term Liabilities", type: "LIABILITY", balance: 142000, children: [
    { id: "2.1", code: "2100", name: "Accounts Payable (AP)", type: "LIABILITY", balance: 84000 },
    { id: "2.2", code: "2200", name: "Tax & VAT Escrow Reserves", type: "LIABILITY", balance: 58000 },
  ]},
  { id: "3", code: "3000", name: "Shareholder & Retained Equity", type: "EQUITY", balance: 1698500 },
  { id: "4", code: "4000", name: "Consolidated Enterprise Revenue", type: "REVENUE", balance: 1248500 },
  { id: "5", code: "5000", name: "Operating & Administrative Expenses (OpEx)", type: "EXPENSE", balance: 714142 },
];

export default function AccountTree() {
  return (
    <div className="glass rounded-3xl border border-border/80 shadow-xl overflow-hidden space-y-2">
      <div className="p-4 sm:p-5 border-b border-border/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
            <Landmark className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground font-heading">Chart of Accounts (COA)</h3>
            <p className="text-xs text-muted-foreground">Double-entry account hierarchy & real-time trial balances</p>
          </div>
        </div>
        <Button 
          onClick={() => toast.success("Root Account added to Chart of Accounts hierarchy.")}
          size="sm" 
          className="gold-gradient text-obsidian-900 font-extrabold text-xs rounded-xl h-8 px-3 shadow-sm hover:opacity-90"
        >
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Account
        </Button>
      </div>

      <div className="p-3 sm:p-4 space-y-1">
        {initialCOA.map((node) => (
          <TreeNode key={node.id} node={node} depth={0} />
        ))}
      </div>
    </div>
  );
}

function TreeNode({ node, depth }: any) {
  const [isOpen, setIsOpen] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={cn(
          "flex items-center justify-between p-3 rounded-2xl transition-colors hover:bg-accent/40 group",
          depth === 0 ? "font-bold text-foreground bg-card/40" : "text-xs text-muted-foreground"
        )}
      >
        <div className="flex items-center flex-1 min-w-0" style={{ paddingLeft: `${depth * 20}px` }}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "p-1 rounded-md hover:bg-accent text-muted-foreground mr-1.5 transition-transform",
              !hasChildren && "opacity-0 pointer-events-none"
            )}
          >
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
          <div className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center mr-2.5 shrink-0",
            depth === 0 ? "gold-gradient text-obsidian-950 font-bold" : "bg-card border border-border text-muted-foreground"
          )}>
            {hasChildren ? <FolderOpen className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
          </div>
          <div className="truncate">
            <span className="text-[10px] font-mono text-gold-600 dark:text-gold-400 mr-2 font-bold">{node.code}</span>
            <span className="text-foreground font-semibold">{node.name}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 shrink-0 pl-2">
          <div className="text-right min-w-[90px]">
            <p className={cn(
              "font-extrabold text-xs font-mono",
              node.type === "ASSET" || node.type === "REVENUE" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            )}>${node.balance.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {isOpen && hasChildren && (
        <div className="space-y-1 pt-1">
          {node.children.map((child: any) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
