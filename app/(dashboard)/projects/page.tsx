import { Metadata } from "next";
import ProjectStats from "./components/ProjectStats";
import { 
  Plus, Search, Filter, LayoutGrid, 
  List, MoreHorizontal, Users, 
  Calendar, Briefcase 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects | Injaazh ERP",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Project Management
          </h1>
          <p className="text-slate-500 text-sm">
            Track budgets, tasks, and team productivity across all active projects.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-11 px-4 border-slate-200">
            <LayoutGrid className="w-5 h-5" />
          </Button>
          <Link href="/projects/new">
            <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
              <Plus className="w-5 h-5 mr-2" /> Start New Project
            </Button>
          </Link>
        </div>
      </div>

      <ProjectStats />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects by name, client or manager..."
            className="w-full bg-white dark:bg-slate-900 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none shadow-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="rounded-lg h-9">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <ProjectCard key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ index }: { index: number }) {
  const status = index === 1 ? "ACTIVE" : index === 2 ? "PLANNING" : "COMPLETED";
  const progress = index === 1 ? 65 : index === 2 ? 0 : 100;
  
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
          status === "ACTIVE" ? "bg-emerald-100 text-emerald-600" :
          status === "PLANNING" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
        )}>
          {status}
        </div>
        <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button>
      </div>

      <Link href={`/projects/${index}`}>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-injaazh-600 transition-colors">
          {index === 1 ? "NexGen E-Commerce" : index === 2 ? "Global ERP Rollout" : "Brand Identity 2026"}
        </h3>
      </Link>
      <p className="text-sm text-slate-500 mb-6 flex items-center">
        <Briefcase className="w-4 h-4 mr-2" /> Meta Corp Inc.
      </p>

      <div className="space-y-6">
        <div>
           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              <span>Overall Progress</span>
              <span>{progress}%</span>
           </div>
           <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  progress === 100 ? "bg-emerald-500" : "bg-injaazh-600"
                )} 
                style={{ width: `${progress}%` }} 
              />
           </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
           <div className="flex -space-x-3">
              {[1, 2, 3].map(a => (
                <div key={a} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 flex items-center justify-center text-[9px] font-black">U</div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-injaazh-600 text-white flex items-center justify-center text-[9px] font-black">+2</div>
           </div>
           <div className="flex items-center text-[10px] font-bold text-slate-400">
              <Calendar className="w-4 h-4 mr-2" /> May 30
           </div>
        </div>
      </div>
      
      {/* Subtle Background Accent */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-injaazh-600/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
    </div>
  );
}
