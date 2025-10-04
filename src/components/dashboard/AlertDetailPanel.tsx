import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  MapPin, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUp
} from "lucide-react";
import { Alert } from "./AlertsTable";
import { cn } from "@/lib/utils";

interface AlertDetailPanelProps {
  alert: Alert;
  onClose: () => void;
}

export function AlertDetailPanel({ alert, onClose }: AlertDetailPanelProps) {
  const severityColors = {
    critical: "bg-severity-critical/10 text-severity-critical border-severity-critical/20",
    high: "bg-severity-high/10 text-severity-high border-severity-high/20",
    medium: "bg-severity-medium/10 text-severity-medium border-severity-medium/20",
    low: "bg-severity-low/10 text-severity-low border-severity-low/20",
    info: "bg-severity-info/10 text-severity-info border-severity-info/20"
  };

  // Mock enrichment data
  const enrichmentData = {
    geoip: {
      country: "United States",
      city: "San Francisco",
      isp: "Cloudflare Inc."
    },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    threatIntel: {
      malicious: alert.severity === "critical" || alert.severity === "high",
      confidence: alert.anomalyScore,
      categories: ["Malware", "Command & Control"]
    }
  };

  const rawLog = `{
  "timestamp": "${alert.timestamp}",
  "event_type": "${alert.eventType}",
  "src_ip": "${alert.sourceIp}",
  "dst_ip": "${alert.destinationIp}",
  "user": "${alert.user}",
  "method": "POST",
  "uri": "/api/auth/login",
  "status_code": 401,
  "user_agent": "${enrichmentData.userAgent}",
  "bytes_sent": 1234,
  "bytes_received": 567,
  "anomaly_score": ${alert.anomalyScore}
}`;

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card animate-slide-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            Alert Details
            <Badge className={severityColors[alert.severity]}>
              {alert.severity}
            </Badge>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-secondary/50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Event ID:</span>
              <p className="font-mono text-neon-blue">{alert.id}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Timestamp:</span>
              <p className="font-mono">{new Date(alert.timestamp).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Source IP:</span>
              <p className="font-mono text-neon-blue">{alert.sourceIp}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Destination IP:</span>
              <p className="font-mono text-neon-blue">{alert.destinationIp}</p>
            </div>
            <div>
              <span className="text-muted-foreground">User:</span>
              <p>{alert.user}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Anomaly Score:</span>
              <p className={cn(
                "font-bold",
                alert.anomalyScore >= 80 && "text-severity-critical",
                alert.anomalyScore >= 60 && alert.anomalyScore < 80 && "text-severity-high",
                alert.anomalyScore >= 40 && alert.anomalyScore < 60 && "text-severity-medium",
                alert.anomalyScore < 40 && "text-severity-low"
              )}>
                {alert.anomalyScore}%
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Enrichment Information */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-neon-blue" />
            Enrichment Data
          </h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-secondary/30 rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">GeoIP Information</h4>
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Country:</span> {enrichmentData.geoip.country}</p>
                <p><span className="text-muted-foreground">City:</span> {enrichmentData.geoip.city}</p>
                <p><span className="text-muted-foreground">ISP:</span> {enrichmentData.geoip.isp}</p>
              </div>
            </div>

            <div className="p-3 bg-secondary/30 rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">Threat Intelligence</h4>
              <div className="flex items-center gap-2 mb-2">
                {enrichmentData.threatIntel.malicious ? (
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-severity-critical" />
                    <span className="text-severity-critical font-medium">Malicious</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-neon-green" />
                    <span className="text-neon-green font-medium">Clean</span>
                  </div>
                )}
                <span className="text-sm text-muted-foreground">
                  Confidence: {enrichmentData.threatIntel.confidence}%
                </span>
              </div>
              {enrichmentData.threatIntel.malicious && (
                <div className="flex gap-1">
                  {enrichmentData.threatIntel.categories.map((category) => (
                    <Badge key={category} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Raw Log */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Raw Log Data</h3>
          <div className="p-3 bg-secondary/30 rounded-lg">
            <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
              {rawLog}
            </pre>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Actions */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-severity-critical/20 text-severity-critical hover:bg-severity-critical/10"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Mark False Positive
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-cyber-orange/20 text-cyber-orange hover:bg-cyber-orange/10"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Escalate
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-neon-green/20 text-neon-green hover:bg-neon-green/10"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Acknowledge
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}