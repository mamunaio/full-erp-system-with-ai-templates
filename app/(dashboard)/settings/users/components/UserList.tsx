"use client";

import { useState } from "react";
import { 
  Shield, User, MoreVertical, 
  Trash2, Mail, Calendar, 
  ShieldCheck, ShieldAlert, CheckCircle2,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserListProps {
  initialUsers: any[];
  currentUserId?: string;
}

export default function UserList({ initialUsers, currentUserId }: UserListProps) {
  const [users, setUsers] = useState(initialUsers);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      setUpdatingId(userId);
      const res = await fetch(`/api/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      toast.success(`Role updated to ${newRole}`);
      
      // Update local state
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      router.refresh();
    } catch (error) {
      toast.error("Security authorization failed");
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identity</th>
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Access Level</th>
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Onboarding</th>
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
              <td className="px-8 py-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-[18px] bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-slate-500 font-black italic shadow-inner">
                    {user.name?.[0] || "U"}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                       <p className="text-sm font-black italic uppercase tracking-tight text-slate-900 dark:text-white">{user.name}</p>
                       {user.id === currentUserId && (
                         <span className="text-[8px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded uppercase tracking-widest">You</span>
                       )}
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 flex items-center mt-0.5">
                      <Mail className="w-3 h-3 mr-1 opacity-50" /> {user.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                       <Button 
                        variant="ghost" 
                        disabled={updatingId === user.id}
                        className={cn(
                          "h-10 rounded-2xl px-4 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 font-black uppercase tracking-widest text-[10px] flex items-center space-x-2 transition-all",
                          user.role === "OWNER" ? "text-blue-600 bg-blue-50 dark:bg-blue-900/10" : 
                          user.role === "ADMIN" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/10" : 
                          "text-slate-500 bg-slate-50 dark:bg-slate-800"
                        )}
                       >
                          {user.role === "OWNER" ? <ShieldCheck className="w-3.5 h-3.5" /> : 
                           user.role === "ADMIN" ? <Shield className="w-3.5 h-3.5" /> : 
                           <User className="w-3.5 h-3.5" />}
                          <span>{user.role}</span>
                          <ChevronDown className="w-3 h-3 opacity-30" />
                       </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="rounded-2xl p-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl w-48">
                       <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-3 py-2">Elevate/Restrict Role</DropdownMenuLabel>
                       <DropdownMenuSeparator className="bg-slate-50 dark:bg-slate-900 mx-2" />
                       <DropdownMenuItem onClick={() => handleRoleChange(user.id, "USER")} className="rounded-xl p-3 cursor-pointer text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center">
                          <User className="w-3.5 h-3.5 mr-2 text-slate-400" /> Standard User
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => handleRoleChange(user.id, "ADMIN")} className="rounded-xl p-3 cursor-pointer text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-600 flex items-center">
                          <Shield className="w-3.5 h-3.5 mr-2" /> Administrator
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => handleRoleChange(user.id, "OWNER")} className="rounded-xl p-3 cursor-pointer text-[10px] font-bold uppercase tracking-widest hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 flex items-center">
                          <ShieldCheck className="w-3.5 h-3.5 mr-2" /> Workspace Owner
                       </DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
              </td>
              <td className="px-8 py-6">
                 <div className="flex items-center space-x-2 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 opacity-50" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                       {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                 </div>
              </td>
              <td className="px-8 py-6 text-right">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                       </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl p-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl">
                       <DropdownMenuItem className="rounded-xl p-3 cursor-pointer text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center">
                          <Trash2 className="w-3.5 h-3.5 mr-2" /> Terminate Access
                       </DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
