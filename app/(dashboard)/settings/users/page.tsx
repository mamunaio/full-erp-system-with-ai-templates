import { Metadata } from "next";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import UserList from "./components/UserList";
import { Users, Shield, UserPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "User Management | Injaazh ERP",
};

export default async function UserManagementPage() {
  const session = await auth();
  const tenantId = (session?.user as any)?.tenantId;
  const currentUserRole = (session?.user as any)?.role;

  // Security Guard: Only ADMIN or OWNER can manage users
  if (currentUserRole === "USER") {
    redirect("/dashboard");
  }

  // Fetch all users for this tenant
  const users = await prisma.user.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    }
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic uppercase leading-none">
            User <span className="text-blue-600">Control</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage permissions and access levels for <span className="text-slate-900 dark:text-white font-bold">Injaazh Enterprise</span>
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-[20px] h-14 px-8 shadow-2xl shadow-blue-600/20 font-black uppercase italic tracking-tighter transition-all active:scale-95">
          <UserPlus className="w-5 h-5 mr-3" /> Invite Member
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <StatCard 
            icon={Users} 
            label="Total Members" 
            value={users.length.toString()} 
            color="blue"
         />
         <StatCard 
            icon={Shield} 
            label="Admins/Owners" 
            value={users.filter(u => u.role !== "USER").length.toString()} 
            color="emerald"
         />
         <StatCard 
            icon={Search} 
            label="Active Nodes" 
            value="1" 
            color="amber"
         />
      </div>

      {/* User Table Component */}
      <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
         <UserList initialUsers={users} currentUserId={session?.user?.id} />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colorMap: any = {
    blue: "bg-blue-600 shadow-blue-600/20",
    emerald: "bg-emerald-500 shadow-emerald-500/20",
    amber: "bg-amber-500 shadow-amber-500/20",
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 flex items-center space-x-6 group">
       <div className={`w-16 h-16 rounded-2xl ${colorMap[color]} flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110`}>
          <Icon className="w-8 h-8" />
       </div>
       <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{label}</p>
          <p className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white">{value}</p>
       </div>
    </div>
  );
}
