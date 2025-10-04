import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Filter, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Alert {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  user: string;
  eventType: string;
  anomalyScore: number;
  severity: "critical" | "high" | "medium" | "low" | "info";
  status: "open" | "closed" | "investigating";
}

interface AlertsTableProps {
  alerts: Alert[];
  onAlertSelect: (alert: Alert) => void;
  selectedAlert?: Alert;
}

export function AlertsTable({ alerts, onAlertSelect, selectedAlert }: AlertsTableProps) {
  const [filter, setFilter] = useState<string>("all");

  const severityColors = {
    critical: "bg-severity-critical/10 text-severity-critical border-severity-critical/20",
    high: "bg-severity-high/10 text-severity-high border-severity-high/20",
    medium: "bg-severity-medium/10 text-severity-medium border-severity-medium/20",
    low: "bg-severity-low/10 text-severity-low border-severity-low/20",
    info: "bg-severity-info/10 text-severity-info border-severity-info/20"
  };

  const statusColors = {
    open: "bg-severity-critical/10 text-severity-critical border-severity-critical/20",
    investigating: "bg-cyber-orange/10 text-cyber-orange border-cyber-orange/20",
    closed: "bg-neon-green/10 text-neon-green border-neon-green/20"
  };

  const filteredAlerts = filter === "all" 
    ? alerts 
    : alerts.filter(alert => alert.severity === filter);

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            Real-time Security Alerts
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-border/50 hover:bg-secondary/50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30 hover:bg-secondary/40">
                <TableHead className="text-muted-foreground font-medium">Timestamp</TableHead>
                <TableHead className="text-muted-foreground font-medium">Source IP</TableHead>
                <TableHead className="text-muted-foreground font-medium">Dest IP</TableHead>
                <TableHead className="text-muted-foreground font-medium">User</TableHead>
                <TableHead className="text-muted-foreground font-medium">Event Type</TableHead>
                <TableHead className="text-muted-foreground font-medium">Score</TableHead>
                <TableHead className="text-muted-foreground font-medium">Severity</TableHead>
                <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                <TableHead className="text-muted-foreground font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow
                  key={alert.id}
                  className={cn(
                    "hover:bg-secondary/30 transition-colors cursor-pointer",
                    selectedAlert?.id === alert.id && "bg-primary/10 border-l-2 border-neon-green"
                  )}
                  onClick={() => onAlertSelect(alert)}
                >
                  <TableCell className="font-mono text-sm">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-neon-blue">
                    {alert.sourceIp}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-neon-blue">
                    {alert.destinationIp}
                  </TableCell>
                  <TableCell className="text-sm">
                    {alert.user}
                  </TableCell>
                  <TableCell className="text-sm">
                    {alert.eventType}
                  </TableCell>
                  <TableCell className="text-sm font-mono">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs",
                      alert.anomalyScore >= 80 && "bg-severity-critical/10 text-severity-critical",
                      alert.anomalyScore >= 60 && alert.anomalyScore < 80 && "bg-severity-high/10 text-severity-high",
                      alert.anomalyScore >= 40 && alert.anomalyScore < 60 && "bg-severity-medium/10 text-severity-medium",
                      alert.anomalyScore < 40 && "bg-severity-low/10 text-severity-low"
                    )}>
                      {alert.anomalyScore}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={severityColors[alert.severity]}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[alert.status]}>
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-secondary/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAlertSelect(alert);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}