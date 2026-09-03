import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

const DataCards = ({
  value,
  title,
  Icon,
}: {
  value: number | undefined;
  title: string;
  Icon: LucideIcon;
}) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-lg font-semibold leading-none">{value ?? 0}</p>
          <p className="text-[11px] text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCards;
