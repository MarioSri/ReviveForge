"use client";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Select from "react-select";
import { Button } from "@/components/ui/button";

const TECH_OPTIONS = [
  { value: "React", label: "React" },
  { value: "Next.js", label: "Next.js" },
  { value: "Node.js", label: "Node.js" },
  { value: "Python", label: "Python" },
  { value: "Django", label: "Django" },
  { value: "Rails", label: "Rails" },
  // ...add more
];

export default function FilterSidebar({ filters, onChange }: { filters: any, onChange: (f: any) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [local, setLocal] = useState(filters);

  function handleApply() {
    onChange(local);
    setMobileOpen(false);
  }
  function handleReset() {
    setLocal({ q: "", tech: [], minPrice: "", maxPrice: "", minHealth: "" });
    onChange({});
    setMobileOpen(false);
  }

  const sidebar = (
    <div className="flex flex-col gap-4 p-4 w-64">
      <div>
        <label className="block text-xs mb-1">Tech Stack</label>
        <Select
          isMulti
          options={TECH_OPTIONS}
          value={TECH_OPTIONS.filter(opt => local.tech?.includes(opt.value))}
          onChange={opts => setLocal({ ...local, tech: opts.map((o: any) => o.value) })}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs mb-1">Min Price</label>
          <input type="number" className="w-full rounded bg-gray-900 px-2 py-1 text-white" value={local.minPrice || ""} onChange={e => setLocal({ ...local, minPrice: e.target.value })} />
        </div>
        <div className="flex-1">
          <label className="block text-xs mb-1">Max Price</label>
          <input type="number" className="w-full rounded bg-gray-900 px-2 py-1 text-white" value={local.maxPrice || ""} onChange={e => setLocal({ ...local, maxPrice: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-xs mb-1">Min Health</label>
        <input type="range" min={0} max={100} value={local.minHealth || 0} onChange={e => setLocal({ ...local, minHealth: e.target.value })} className="w-full" />
        <span className="text-xs">{local.minHealth || 0}</span>
      </div>
      <div className="flex gap-2 mt-2">
        <Button onClick={handleApply} className="flex-1">Apply</Button>
        <Button onClick={handleReset} variant="outline" className="flex-1">Reset</Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 border-r border-gray-800 bg-gray-950">
        {sidebar}
      </div>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button className="lg:hidden fixed bottom-4 left-4 z-50" aria-label="Open filters">Filters</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="p-0 bg-gray-950">
          {sidebar}
        </SheetContent>
      </Sheet>
    </>
  );
}
