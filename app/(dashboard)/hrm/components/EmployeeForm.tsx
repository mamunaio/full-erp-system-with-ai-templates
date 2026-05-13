"use client";

import { useState } from "react";
import { 
  User, Briefcase, Wallet, FileText, 
  ChevronRight, ChevronLeft, Check, Camera 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Job Info", icon: Briefcase },
  { id: 3, title: "Salary Info", icon: Wallet },
  { id: 4, title: "Access", icon: FileText },
];

export default function EmployeeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", dob: "", gender: "",
    employeeId: "EMP-001", departmentId: "", designationId: "",
    joiningDate: "", employmentType: "Full-time",
    basicSalary: "", houseAllowance: "",
    role: "USER"
  });

  const next = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Progress Bar */}
      <div className="flex items-center justify-between px-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className={cn(
              "flex flex-col items-center space-y-2 relative z-10",
              currentStep >= step.id ? "text-injaazh-600" : "text-slate-300"
            )}>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                currentStep === step.id ? "bg-white border-injaazh-600 shadow-lg shadow-injaazh-600/20" : 
                currentStep > step.id ? "bg-injaazh-600 border-injaazh-600 text-white" : "bg-white border-slate-200"
              )}>
                {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest absolute -bottom-6 w-max">
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "h-0.5 flex-1 mx-4 transition-all",
                currentStep > step.id ? "bg-injaazh-600" : "bg-slate-200"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl mt-10">
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col items-center justify-center space-y-4 mb-8">
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-injaazh-500 hover:text-injaazh-500 transition-all">
                <Camera className="w-8 h-8" />
                <span className="text-[10px] font-bold mt-1">Upload Photo</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FormGroup label="Full Name" placeholder="e.g. John Doe" />
              <FormGroup label="Email Address" placeholder="john@company.com" type="email" />
              <FormGroup label="Phone Number" placeholder="+880 1XXX XXXXXX" />
              <FormGroup label="Date of Birth" type="date" />
              <FormGroup label="Gender" type="select" options={["Male", "Female", "Other"]} />
              <FormGroup label="Blood Group" type="select" options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 gap-6">
              <FormGroup label="Employee ID" value="EMP-001" disabled />
              <FormGroup label="Department" type="select" options={["IT", "HR", "Sales", "Marketing"]} />
              <FormGroup label="Designation" type="select" options={["Software Engineer", "HR Manager", "Sales Executive"]} />
              <FormGroup label="Joining Date" type="date" />
              <FormGroup label="Employment Type" type="select" options={["Full-time", "Part-time", "Contract"]} />
              <FormGroup label="Reporting Manager" type="select" options={["Alice (CEO)", "Bob (CTO)"]} />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 gap-6">
              <FormGroup label="Basic Salary" placeholder="0.00" type="number" />
              <FormGroup label="House Allowance" placeholder="0.00" type="number" />
              <FormGroup label="Medical Allowance" placeholder="0.00" type="number" />
              <FormGroup label="Transport Allowance" placeholder="0.00" type="number" />
              <FormGroup label="Tax %" placeholder="0" type="number" />
              <FormGroup label="PF %" placeholder="0" type="number" />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-500 text-center">
            <div className="max-w-md mx-auto space-y-6">
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Ready to Submit</h3>
                <p className="text-sm text-slate-500 mt-2">Please review all information before finalizing the employee registration.</p>
              </div>
              <FormGroup label="System Access Role" type="select" options={["USER", "MANAGER", "ADMIN"]} />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
          <Button 
            variant="ghost" 
            onClick={back} 
            disabled={currentStep === 1}
            className="rounded-xl px-6 h-12 font-bold"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Back
          </Button>
          {currentStep < 4 ? (
            <Button 
              onClick={next} 
              className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl px-8 h-12 font-bold shadow-lg shadow-injaazh-600/20"
            >
              Next <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-12 h-12 font-bold shadow-lg shadow-emerald-600/20"
            >
              Submit & Register
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, placeholder, type = "text", options = [], disabled = false, value = "" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      {type === "select" ? (
        <select 
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none transition-all appearance-none"
          disabled={disabled}
        >
          {options.map((opt: string) => <option key={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          disabled={disabled}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none transition-all"
        />
      )}
    </div>
  );
}
