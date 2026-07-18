"use client";

import {
  Search, Filter, FileSpreadsheet,
  Phone, Mail, Calendar, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ContactTable() {
  const router = useRouter();
  const contacts = [
    { id: "1", name: "Alex Rivera", company: "TechFlow Inc.", email: "alex@techflow.com", phone: "+1 234 567 890", type: "CUSTOMER", lastActivity: "2 hours ago" },
    { id: "2", name: "Sarah Connor", company: "SkyNet Systems", email: "sarah@skynet.com", phone: "+1 987 654 321", type: "PROSPECT", lastActivity: "1 day ago" },
    { id: "3", name: "Bruce Wayne", company: "Wayne Ent.", email: "bruce@wayne.com", phone: "+1 555 012 345", type: "PARTNER", lastActivity: "3 days ago" },
  ];

  const typeStyles: Record<string, string> = {
    CUSTOMER: "bg-emerald-500/15 text-emerald-400",
    PROSPECT: "bg-gold-500/15 text-gold-400",
    PARTNER: "bg-muted text-muted-foreground",
  };

  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border overflow-hidden hover:border-gold-500/20 transition-all duration-300">
      <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search contacts, emails, companies..."
            className="w-full bg-card/40 border border-border/60 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="rounded-lg h-9 border-border bg-card/60">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg h-9 border-border bg-card/60">
            <FileSpreadsheet className="w-4 h-4 mr-2" /> Import
          </Button>
          <Button className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-lg h-9 shadow-lg shadow-gold-500/20">
            <Plus className="w-4 h-4 mr-2" /> New Contact
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
              <th className="p-4 border-b border-border">Contact</th>
              <th className="p-4 border-b border-border">Company</th>
              <th className="p-4 border-b border-border">Email & Phone</th>
              <th className="p-4 border-b border-border">Type</th>
              <th className="p-4 border-b border-border text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="hover:bg-gold-500/5 cursor-pointer transition-colors group"
                onClick={() => router.push(`/crm/contacts/${contact.id}`)}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold text-sm">
                      {contact.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground">{contact.name}</p>
                      <p className="text-[10px] text-muted-foreground">Last activity: {contact.lastActivity}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground font-medium">{contact.company}</td>
                <td className="p-4">
                  <div className="space-y-0.5">
                    <p className="text-xs text-card-foreground">{contact.email}</p>
                    <p className="text-[10px] text-muted-foreground">{contact.phone}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${typeStyles[contact.type] || "bg-muted text-muted-foreground"}`}>
                    {contact.type}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-gold-400">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-gold-400">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-gold-400">
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
