import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function ColorOption({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2 text-primary basis-1 w-full">
        <div
          className={cn(
            "w-6 h-6 rounded-full border",
            color === "#f5f5dc" ? "border-gray-300" : "border-transparent"
          )}
          style={{ backgroundColor: color }}
        />
        <Label className="text-sm font-normal cursor-pointer">{label}</Label>
      </div>
      <span className="text-sm text-muted-foreground">(24)</span>
    </div>
  );
}

export default ColorOption;
