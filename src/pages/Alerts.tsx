import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const Alerts = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alerts Management</h1>
          <p className="text-muted-foreground">Manage and investigate security alerts</p>
        </div>
        
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-border/50 rounded-lg">
          <p className="text-muted-foreground">Alerts page content coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;