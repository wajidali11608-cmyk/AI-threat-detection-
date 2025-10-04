import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  className
}: MetricCardProps) {
  const changeColors = {
    positive: "text-neon-green",
    negative: "text-severity-critical",
    neutral: "text-muted-foreground"
  };

  return (
    <Card className={cn(
      "bg-gradient-card border-border/50 shadow-card hover:shadow-neon-blue/20 transition-all duration-300 animate-slide-in",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-4 w-4 text-neon-green" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        {change && (
          <p className={cn("text-xs", changeColors[changeType])}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}