import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useUpdateParam } from "@/src/hooks/useUpdateParam";
import { ORDER_STATUS } from "@/src/lib/constants/order";
import { useState } from "react";

const SelectStatus = () => {
  const [status, setStatus] = useState<string | null>(null);

  const { updateParam } = useUpdateParam();

  const handleChangeStatus = (status: string | null) => {
    const safeStatus = status ?? "";

    setStatus(safeStatus);
    updateParam("status", status);
  };

  return (
    <Select
      items={ORDER_STATUS}
      onValueChange={(val) => handleChangeStatus(val)}
      value={status}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue className="text-black">
          {(value: string | null) =>
            ORDER_STATUS.find((item) => item.value === value)?.label ??
            "Select a status"
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {ORDER_STATUS.map((item) => (
            <SelectItem key={item.value} value={item.value ?? ""}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectStatus;
