import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type BrandCheckboxProps = {
  addBrandFilter: (brand: string, checked: boolean) => void;
  label: string;
  count: number;
};

function BrandCheckbox({ label, count, addBrandFilter }: BrandCheckboxProps) {
  const handleCheckboxClick = (checked: boolean | string) => {
    if (checked === "indeterminate" || typeof checked === "string") {
      return;
    }
    addBrandFilter(label, checked);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2 w-full">
        <Checkbox
          onCheckedChange={(checked) => handleCheckboxClick(checked)}
          id={`checkbox-${label}`}
          className="w-6 h-6"
        />
        <Label
          htmlFor={`checkbox-${label}`}
          className="text-sm font-normal cursor-pointer"
        >
          {label}
        </Label>
      </div>
      <span className="text-sm text-muted-foreground">({count})</span>
    </div>
  );
}

export default BrandCheckbox;
