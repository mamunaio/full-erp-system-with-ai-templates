"use client";

import { 
  Search, Filter, FileSpreadsheet, 
  Phone, Mail, Calendar, MoreHorizontal,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ContactTable() {
  const router = useRouter();
  const contacts = [
    { id: "1", name: "Alex Rivera", company: "TechFlow Inc.", email: "alex@techflow.com", phone: "+1 234 567 890", type: "CUSTOMER", lastActivity: "2 hours ago" },
    { id: "2", name: "Sarah Connor", company: "SkyNet Systems", email: "sarah@skynet.com", phone: "+1 987 654 321", type: "PROSPECT", lastActivity: "1 day ago" },
    { id: "3", name: "Bruce Wayne", company: "Wayne Ent.", email: "bruce@wayne.com", phone: "+1 555 012 345", type: "PARTNER", lastActivity: "3 days ago" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search contacts, emails, companies..."
            className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none transition-all"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="rounded-lg h-9">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg h-9">
            <FileSpreadsheet className="w-4 h-4 mr-2" /> Import
          </Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-lg h-9">
            <Plus className="w-4 h-4 mr-2" /> New Contact
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <th className="p-4 border-b dark:border-slate-800">Contact</th>
              <th className="p-4 border-b dark:border-slate-800">Company</th>
              <th className="p-4 border-b dark:border-slate-800">Email & Phone</th>
              <th className="p-4 border-b dark:border-slate-800">Type</th>
              <th className="p-4 border-b dark:border-slate-800 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {contacts.map((contact) => (
              <tr 
                key={contact.id} 
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
                onClick={() => router.push(`/crm/contacts/${contact.id}`)}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-injaazh-100 text-injaazh-600 flex items-center justify-center font-bold text-sm">
                      {contact.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{contact.name}</p>
                      <p className="text-[10px] text-slate-500">Last activity: {contact.lastActivity}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">{contact.company}</td>
                <td className="p-4">
                  <div className="space-y-0.5">
                    <p className="text-xs text-slate-600 dark:text-slate-400">{contact.email}</p>
                    <p className="text-[10px] text-slate-400">{contact.phone}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    contact.type === "CUSTOMER" ? "bg-emerald-100 text-emerald-600" :
                    contact.type === "PROSPECT" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
                  )}>
                    {contact.type}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-injaazh-600">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-blue-600">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-amber-600">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
