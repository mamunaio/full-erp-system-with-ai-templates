"use client";

import { useState } from "react";
import { 
  ChevronRight, ChevronDown, FolderOpen, 
  FileText, Plus, MoreVertical 
} from "lucide-react";
import { cn } from "@/lib/utils";

const initialCOA = [
  { id: "1", code: "1000", name: "Assets", type: "ASSET", balance: 150000, children: [
    { id: "1.1", code: "1100", name: "Cash & Equivalents", type: "ASSET", balance: 128900 },
    { id: "1.2", code: "1200", name: "Accounts Receivable", type: "ASSET", balance: 12450 },
    { id: "1.3", code: "1300", name: "Inventory", type: "ASSET", balance: 8650 },
  ]},
  { id: "2", code: "2000", name: "Liabilities", type: "LIABILITY", balance: 5300, children: [
    { id: "2.1", code: "2100", name: "Accounts Payable", type: "LIABILITY", balance: 5300 },
  ]},
  { id: "3", code: "3000", name: "Equity", type: "EQUITY", balance: 102620 },
  { id: "4", code: "4000", name: "Revenue", type: "REVENUE", balance: 84230 },
  { id: "5", code: "5000", name: "Expenses", type: "EXPENSE", balance: 42150 },
];

export default function AccountTree() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Chart of Accounts</h3>
        <Button variant="outline" size="sm" className="h-8 rounded-lg">
          <Plus className="w-3 h-3 mr-2" /> Add Root Account
        </Button>
      </div>
      <div className="p-4">
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
          "flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 group",
          depth === 0 ? "font-bold text-slate-900 dark:text-white" : "text-sm text-slate-600 dark:text-slate-400"
        )}
      >
        <div className="flex items-center flex-1" style={{ paddingLeft: `${depth * 24}px` }}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 mr-2 transition-transform",
              !hasChildren && "opacity-0 pointer-events-none"
            )}
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center mr-3",
            depth === 0 ? "bg-injaazh-100 text-injaazh-600" : "bg-slate-100 text-slate-400"
          )}>
            {hasChildren ? <FolderOpen className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 mr-2">{node.code}</span>
            <span>{node.name}</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right min-w-[100px]">
            <p className={cn(
              "font-bold",
              node.type === "ASSET" || node.type === "REVENUE" ? "text-emerald-600" : "text-rose-600"
            )}>${node.balance.toLocaleString()}</p>
          </div>
          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 text-slate-400 hover:text-injaazh-600"><Plus className="w-4 h-4" /></button>
            <button className="p-1 text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {isOpen && hasChildren && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          {node.children.map((child: any) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

import { Button } from "@/components/ui/button";
