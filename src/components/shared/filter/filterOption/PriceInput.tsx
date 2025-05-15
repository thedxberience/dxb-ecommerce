import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type PriceInputProps = {
  label: string;
  onChange: (value: string) => void;
};

const PriceInput = ({ label, onChange }: PriceInputProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <div className="flex items-center border rounded gap-2">
        <span className="text-muted-foreground ml-3 mr-1">$</span>
        <Input
          type="number"
          onChange={(e) => onChange(e.target.value)}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="0"
          defaultValue="0"
        />
      </div>
    </div>
  );
};

export default PriceInput;
