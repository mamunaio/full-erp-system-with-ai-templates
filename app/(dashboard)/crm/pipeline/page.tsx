import { Metadata } from "next";
import KanbanBoard from "../components/KanbanBoard";
import { Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sales Pipeline | Injaazh ERP",
};

export default function PipelinePage() {
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sales Pipeline
          </h1>
          <p className="text-slate-500 text-sm">
            Visualize your deals and move them through stages.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search leads..."
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none w-64"
            />
          </div>
          <Button variant="outline" className="rounded-xl h-10">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-10">
            <Plus className="w-4 h-4 mr-2" /> New Lead
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <KanbanBoard />
      </div>
    </div>
  );
}
