import { Metadata } from "next";
import Link from "next/link";
import { Plus, CheckCircle2, XCircle, Clock, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Leave Management | Injaazh ERP",
};

export default function LeavePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link href="/hrm" className="group flex items-center text-sm font-medium text-slate-500 hover:text-injaazh-600 transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to HRM
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Leave Management
          </h1>
          <p className="text-slate-500 text-sm">
            Review leave requests and track employee time-off balances.
          </p>
        </div>
        <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
          <Plus className="w-5 h-5 mr-2" /> Apply for Leave
        </Button>
      </div>

      {/* Balance Row */}
      <div className="grid gap-6 md:grid-cols-3">
        <BalanceCard label="Annual Leave" remaining={12} total={20} color="bg-emerald-500" />
        <BalanceCard label="Sick Leave" remaining={5} total={10} color="bg-blue-500" />
        <BalanceCard label="Casual Leave" remaining={2} total={5} color="bg-amber-500" />
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 rounded-xl h-12">
          <TabsTrigger value="all" className="rounded-lg px-6">All Requests</TabsTrigger>
          <TabsTrigger value="my" className="rounded-lg px-6">My Leaves</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="outline-none">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                  <th className="p-4 border-b dark:border-slate-800">Employee</th>
                  <th className="p-4 border-b dark:border-slate-800">Type</th>
                  <th className="p-4 border-b dark:border-slate-800">Duration</th>
                  <th className="p-4 border-b dark:border-slate-800">Status</th>
                  <th className="p-4 border-b dark:border-slate-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">S</div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Sarah Ahmed</p>
                          <p className="text-[10px] text-slate-500 text-injaazh-600 font-bold">IT Department</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">Annual Leave</td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-medium">May 15 - 17</span>
                        <span className="text-[10px] text-slate-400">3 Days</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-600 text-[10px] font-bold uppercase">Pending</span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button size="sm" variant="outline" className="h-8 rounded-lg text-emerald-600 border-emerald-100 hover:bg-emerald-50">Approve</Button>
                        <Button size="sm" variant="outline" className="h-8 rounded-lg text-rose-600 border-rose-100 hover:bg-rose-50">Reject</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BalanceCard({ label, remaining, total, color }: any) {
  const percentage = (remaining / total) * 100;
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
          <p className="text-2xl font-bold mt-1">{remaining} <span className="text-sm font-normal text-slate-400">/ {total} Days</span></p>
        </div>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center opacity-20", color)}>
          <FileText className="w-6 h-6" />
        </div>
      </div>
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-1000", color)} style={{ width: `${percentage}%` }} />
      </div>
      <p className="text-[10px] text-slate-400 mt-2 font-medium">{percentage}% balance remaining</p>
    </div>
  );
}
