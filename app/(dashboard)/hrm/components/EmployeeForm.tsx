"use client";

import { useState } from "react";
import { 
  User, Briefcase, Wallet, FileText, 
  ChevronRight, ChevronLeft, Check, Camera, Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Job Info", icon: Briefcase },
  { id: 3, title: "Salary Info", icon: Wallet },
  { id: 4, title: "Access", icon: FileText },
];

export default function EmployeeForm({ departments, designations }: any) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    employeeId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
    departmentId: departments[0]?.id || "",
    designationId: designations[0]?.id || "",
    joiningDate: new Date().toISOString().split('T')[0],
    employmentType: "Full-time",
    basicSalary: 0,
    houseAllowance: 0,
    medicalAllowance: 0,
    transportAllowance: 0,
    taxPercent: 0,
    pfPercent: 0,
    role: "USER"
  });

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const next = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hrm/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to register employee");

      toast.success("Employee registered successfully!");
      router.push("/hrm/employees");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
            <div className="grid md:grid-cols-2 gap-6">
              <FormGroup label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" required />
              <FormGroup label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" type="email" required />
              <FormGroup label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+880 1XXX XXXXXX" />
              <FormGroup label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} type="date" />
              <FormGroup label="Gender" name="gender" value={formData.gender} onChange={handleChange} type="select" options={[{label: "Male", value: "Male"}, {label: "Female", value: "Female"}, {label: "Other", value: "Other"}]} />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 gap-6">
              <FormGroup label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} disabled />
              <FormGroup label="Department" name="departmentId" value={formData.departmentId} onChange={handleChange} type="select" options={departments.map((d: any) => ({ label: d.name, value: d.id }))} />
              <FormGroup label="Designation" name="designationId" value={formData.designationId} onChange={handleChange} type="select" options={designations.map((d: any) => ({ label: d.name, value: d.id }))} />
              <FormGroup label="Joining Date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} type="date" />
              <FormGroup label="Employment Type" name="employmentType" value={formData.employmentType} onChange={handleChange} type="select" options={[{label: "Full-time", value: "Full-time"}, {label: "Part-time", value: "Part-time"}, {label: "Contract", value: "Contract"}]} />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 gap-6">
              <FormGroup label="Basic Salary" name="basicSalary" value={formData.basicSalary} onChange={handleChange} placeholder="0.00" type="number" />
              <FormGroup label="House Allowance" name="houseAllowance" value={formData.houseAllowance} onChange={handleChange} placeholder="0.00" type="number" />
              <FormGroup label="Medical Allowance" name="medicalAllowance" value={formData.medicalAllowance} onChange={handleChange} placeholder="0.00" type="number" />
              <FormGroup label="Transport Allowance" name="transportAllowance" value={formData.transportAllowance} onChange={handleChange} placeholder="0.00" type="number" />
              <FormGroup label="Tax %" name="taxPercent" value={formData.taxPercent} onChange={handleChange} placeholder="0" type="number" />
              <FormGroup label="PF %" name="pfPercent" value={formData.pfPercent} onChange={handleChange} placeholder="0" type="number" />
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
              <FormGroup label="System Access Role" name="role" value={formData.role} onChange={handleChange} type="select" options={[{label: "USER", value: "USER"}, {label: "MANAGER", value: "MANAGER"}, {label: "ADMIN", value: "ADMIN"}]} />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
          <Button 
            variant="ghost" 
            onClick={back} 
            disabled={currentStep === 1 || loading}
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
              onClick={handleSubmit}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-12 h-12 font-bold shadow-lg shadow-emerald-600/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              Submit & Register
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, name, placeholder, type = "text", options = [], disabled = false, value, onChange, required }: any) {
  return (
    <div className="space-y-2 text-left">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{label} {required && "*"}</label>
      {type === "select" ? (
        <select 
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none transition-all appearance-none"
          disabled={disabled}
        >
          {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      ) : (
        <input 
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none transition-all"
        />
      )}
    </div>
  );
}
