"use client";

import { useState } from "react";
import { 
  Star, Phone, Mail, MoreHorizontal, 
  Plus, Search, Filter, Building2, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const vendors = [
  { id: "1", name: "Apple Authorized Commercial", category: "Hardware Fleet", contact: "Johnathan Smith", email: "enterprise@apple-dist.com", rating: 4.9, purchases: 145000, status: "ACTIVE", terms: "Net 30" },
  { id: "2", name: "Cisco Systems Enterprise", category: "Networking Nodes", contact: "Sarah Jenkins", email: "sales@cisco-direct.com", rating: 5.0, purchases: 120000, status: "ACTIVE", terms: "Net 45" },
  { id: "3", name: "Dell Commercial Supply", category: "Workstations & Displays", contact: "Michael Brown", email: "orders@dell-partners.com", rating: 4.8, purchases: 98000, status: "ACTIVE", terms: "Net 30" },
  { id: "4", name: "Logitech Global Direct", category: "Peripherals & Audio", contact: "Elena Rostova", email: "supply@logitech-b2b.com", rating: 4.7, purchases: 42000, status: "ACTIVE", terms: "Net 15" },
];

export default function VendorTable() {
  const [search, setSearch] = useState("");

  const filteredVendors = vendors.filter((v) => 
    v.name.toLowerCase().includes(search.toLowerCase()) || 
    v.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="glass rounded-3xl border border-border/80 shadow-xl overflow-hidden space-y-2">
      <div className="p-4 sm:p-5 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-foreground font-heading">Strategic Vendor Directory</h3>
          <p className="text-xs text-muted-foreground">Certified tier-1 suppliers, contracts, and payment credit terms</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search suppliers, category..."
              className="w-full bg-background border border-border rounded-xl py-1.5 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-gold-500/50"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-card/60 text-muted-foreground font-extrabold uppercase tracking-wider text-[10px] border-b border-border/60">
              <th className="p-4">Vendor Partner</th>
              <th className="p-4">Supply Category</th>
              <th className="p-4">Key Contact</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Terms</th>
              <th className="p-4">Total Sourcing</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filteredVendors.map((v) => (
              <tr key={v.id} className="hover:bg-accent/40 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center font-extrabold text-xs text-obsidian-950 shrink-0">
                      {v.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{v.name}</p>
                      <p className="text-[10px] text-muted-foreground">{v.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-bold text-foreground bg-accent/60 px-2 py-0.5 rounded-md text-[11px]">{v.category}</span>
                </td>
                <td className="p-4 text-muted-foreground font-medium">{v.contact}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-extrabold text-foreground">{v.rating}</span>
                  </div>
                </td>
                <td className="p-4 font-mono font-semibold text-muted-foreground">{v.terms}</td>
                <td className="p-4 font-extrabold gold-text font-heading text-sm">${v.purchases.toLocaleString()}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <button 
                      onClick={() => toast.info(`Drafted RFP email to ${v.email}`)}
                      className="p-1.5 rounded-lg bg-accent/60 hover:bg-gold-500/20 text-muted-foreground hover:text-gold-500 transition-colors"
                      title="Send RFP"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => toast.info(`Calling vendor contact: ${v.contact}`)}
                      className="p-1.5 rounded-lg bg-accent/60 hover:bg-emerald-500/20 text-muted-foreground hover:text-emerald-500 transition-colors"
                      title="Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
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
