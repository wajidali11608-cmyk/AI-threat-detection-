import { SidebarTrigger } from "@/components/ui/sidebar";
import { Shield, Activity } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-neon-green hover:bg-secondary" />
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-cyber rounded-lg">
            <Shield className="h-6 w-6 text-neon-green" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Cloud Threat Detection Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              AI-powered log analysis
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-neon-green/10 border border-neon-green/20 rounded-lg">
          <Activity className="h-4 w-4 text-neon-green animate-pulse" />
          <span className="text-sm font-medium text-neon-green">Live Monitoring</span>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </header>
  );
}