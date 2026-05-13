import { Metadata } from "next";
import { 
  User, Mail, Phone, MapPin, 
  Calendar, Briefcase, Wallet, FileText,
  Sparkles, Edit2, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttendanceCalendar from "../../components/AttendanceCalendar";

export const metadata: Metadata = {
  title: "Employee Profile | Injaazh ERP",
};

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <Link href="/hrm/employees" className="group flex items-center text-sm font-medium text-slate-500 hover:text-injaazh-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Directory
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-10">
            <Sparkles className="w-4 h-4 mr-2 text-injaazh-600" /> AI Summary
          </Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-10">
            <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-injaazh-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-injaazh-600/20">
            JD
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">John Doe</h1>
              <span className="w-fit mx-auto md:mx-0 px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                Active
              </span>
            </div>
            <p className="text-slate-500 font-medium">Senior Software Engineer • Engineering Department</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <div className="flex items-center text-xs text-slate-400"><Mail className="w-3 h-3 mr-1.5" /> john@company.com</div>
              <div className="flex items-center text-xs text-slate-400"><Phone className="w-3 h-3 mr-1.5" /> +880 1712 345678</div>
              <div className="flex items-center text-xs text-slate-400"><MapPin className="w-3 h-3 mr-1.5" /> Dhaka, Bangladesh</div>
              <div className="flex items-center text-xs text-slate-400 font-bold"><Calendar className="w-3 h-3 mr-1.5" /> Joined Jan 1, 2023</div>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendance</p>
              <p className="text-xl font-bold text-emerald-500 mt-1">98%</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Leaves</p>
              <p className="text-xl font-bold text-blue-500 mt-1">12/20</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 rounded-xl h-12">
          <TabsTrigger value="overview" className="rounded-lg px-6"><User className="w-4 h-4 mr-2" /> Overview</TabsTrigger>
          <TabsTrigger value="attendance" className="rounded-lg px-6"><Calendar className="w-4 h-4 mr-2" /> Attendance</TabsTrigger>
          <TabsTrigger value="leave" className="rounded-lg px-6"><FileText className="w-4 h-4 mr-2" /> Leave History</TabsTrigger>
          <TabsTrigger value="payroll" className="rounded-lg px-6"><Wallet className="w-4 h-4 mr-2" /> Payroll</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 outline-none">
          <div className="grid md:grid-cols-2 gap-6">
            <CardGroup title="Personal Information">
              <InfoRow label="Full Name" value="John Doe" />
              <InfoRow label="Date of Birth" value="May 15, 1990" />
              <InfoRow label="Gender" value="Male" />
              <InfoRow label="NID / Passport" value="123456789012" />
            </CardGroup>
            <CardGroup title="Employment Details">
              <InfoRow label="Employee ID" value="EMP-001" />
              <InfoRow label="Department" value="Engineering" />
              <InfoRow label="Designation" value="Senior Software Engineer" />
              <InfoRow label="Employment Type" value="Full-time" />
            </CardGroup>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="outline-none">
          <AttendanceCalendar />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CardGroup({ title, children }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      <h3 className="font-bold text-lg border-b border-slate-50 dark:border-slate-800 pb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{value}</span>
    </div>
  );
}
