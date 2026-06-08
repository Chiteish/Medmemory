"use client";

import React, { useState } from "react";

import { Users, UserPlus, ShieldCheck, ShieldAlert, Upload } from "lucide-react";
import { useHealthStore, FamilyMember } from "@/store/healthStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export default function FamilyPage() {
  const { familyMembers, addFamilyMember } = useHealthStore();
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [relation, setRelation] = useState<FamilyMember["relation"]>("Child");
  const [age, setAge] = useState("");
  const [conditionInput, setConditionInput] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [sharingRole, setSharingRole] = useState<FamilyMember["sharingRole"]>("View Only");
  const [emergencyAccess, setEmergencyAccess] = useState(true);

  const addCondition = () => {
    if (conditionInput.trim() && !conditions.includes(conditionInput.trim())) {
      setConditions([...conditions, conditionInput.trim()]);
      setConditionInput("");
    }
  };

  const removeCondition = (c: string) => {
    setConditions(conditions.filter((item) => item !== c));
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !age) return;

    addFamilyMember({
      name,
      relation,
      age: parseInt(age),
      conditions,
      sharingRole,
      emergencyAccess
    });

    // Reset Form
    setName("");
    setRelation("Child");
    setAge("");
    setConditions([]);
    setConditionInput("");
    setSharingRole("View Only");
    setEmergencyAccess(true);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="text-brand" /> Family Health Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage files, view permissions, and enable emergency healthcare sharing with family members
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          leftIcon={<UserPlus size={15} />}
        >
          Add Profile
        </Button>
      </div>

      {/* Add Profile Form Panel */}
      {showAddForm && (
        <Card className="border-brand-100 bg-slate-50/50 dark:bg-slate-900/40 p-5 ring-4 ring-brand-500/5">
          <form onSubmit={handleAddMember} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
              Add New Family Member
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Full Name"
                placeholder="Elena Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-350">
                  Relation
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value as FamilyMember["relation"])}
                  className="h-10 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-250 focus:outline-none"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Child">Child</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <Input
                label="Age"
                type="number"
                placeholder="30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Medical conditions tags */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-350">
                  Medical Conditions
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="e.g. Asthma"
                    value={conditionInput}
                    onChange={(e) => setConditionInput(e.target.value)}
                    className="h-9 px-3 flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none"
                  />
                  <Button type="button" size="sm" onClick={addCondition} variant="outline" className="h-9">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {conditions.map((c, i) => (
                    <Badge key={i} variant="primary" className="gap-1 text-[10px]">
                      {c}
                      <button type="button" onClick={() => removeCondition(c)} className="text-slate-450 hover:text-red-500">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Roles and Emergency */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-350">
                    Sharing Permissions
                  </label>
                  <select
                    value={sharingRole}
                    onChange={(e) => setSharingRole(e.target.value as FamilyMember["sharingRole"])}
                    className="h-10 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-250 focus:outline-none"
                  >
                    <option value="Full Access">Full Access</option>
                    <option value="Emergency Only">Emergency Only</option>
                    <option value="View Only">View Only</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1.5 justify-center">
                  <label className="flex items-center space-x-2 text-xs font-semibold text-slate-650 dark:text-slate-350 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={emergencyAccess}
                      onChange={(e) => setEmergencyAccess(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-350 dark:border-slate-800 text-brand focus:ring-brand-500/20"
                    />
                    <span>Allow emergency override</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" size="sm" variant="ghost" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save Profile
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Profile list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {familyMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow relative overflow-hidden">
            {/* Top accent line */}
            <div className="h-1 w-full bg-brand-500" />
            
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="h-11 w-11 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-350 flex items-center justify-center font-bold text-sm">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Badge variant="outline" className="text-[9px] uppercase tracking-wide">
                        {member.relation}
                      </Badge>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        Age {member.age}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Emergency access badge */}
                {member.emergencyAccess ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-750 dark:bg-red-950/20 dark:text-red-400 text-[9px] font-bold border border-red-150 dark:border-red-900/30 shadow-sm animate-pulse">
                    <ShieldAlert size={10} /> EMT Access
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 text-[9px] font-bold border border-slate-200 dark:border-slate-750">
                    <ShieldCheck size={10} /> Secure Lock
                  </span>
                )}
              </div>

              {/* Conditions tag list */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Diagnosis & Conditions
                </span>
                <div className="flex flex-wrap gap-1">
                  {member.conditions.length > 0 ? (
                    member.conditions.map((cond, i) => (
                      <Badge key={i} variant="primary" className="text-[9px]">
                        {cond}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold italic">No recorded conditions</span>
                  )}
                </div>
              </div>

              {/* Permission & share roles panel */}
              <div className="border-t border-slate-50 dark:border-slate-800/80 pt-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-slate-450 uppercase block">Permission Role</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-350">
                    {member.sharingRole}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={<Upload size={12} />}
                    onClick={() => alert(`Simulate uploading reports to ${member.name}`)}
                    className="text-[10px] hover:bg-brand-50 hover:text-brand dark:hover:bg-brand-950/20 dark:hover:text-brand-400"
                  >
                    Upload Record
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
