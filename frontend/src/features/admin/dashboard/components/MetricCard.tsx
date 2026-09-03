import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  changePercent: number;
}

const MetricCard = ({ label, value, changePercent }: MetricCardProps) => {
  const isPositive = changePercent >= 0;

  return (
    <Card>
      <CardHeader>
        <p className="text-stone-500">{label}</p>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <p
          className={`text-xs mt-1 flex items-center gap-1 ${
            isPositive ? "text-green-600" : "text-rose-600"
          }`}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(changePercent)}%
        </p>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
