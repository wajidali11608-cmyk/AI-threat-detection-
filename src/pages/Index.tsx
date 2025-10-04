import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AlertsTable, Alert } from "@/components/dashboard/AlertsTable";
import { AlertDetailPanel } from "@/components/dashboard/AlertDetailPanel";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { 
  Activity, 
  AlertTriangle, 
  Zap, 
  Target,
} from "lucide-react";

// Mock alert data
const generateMockAlerts = (): Alert[] => {
  const severities: Alert['severity'][] = ['critical', 'high', 'medium', 'low', 'info'];
  const statuses: Alert['status'][] = ['open', 'investigating', 'closed'];
  const eventTypes = ['Malware Detection', 'Suspicious Login', 'Data Exfiltration', 'Network Anomaly', 'Brute Force Attack'];
  const users = ['john.doe', 'jane.smith', 'admin', 'service_account', 'external_user'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `AL-${String(i + 1).padStart(4, '0')}`,
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    sourceIp: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    destinationIp: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    user: users[Math.floor(Math.random() * users.length)],
    eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
    anomalyScore: Math.floor(Math.random() * 100),
    severity: severities[Math.floor(Math.random() * severities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const Index = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | undefined>();
  const [metrics, setMetrics] = useState({
    totalEvents: 2847293,
    activeAlerts: 156,
    highSeverityAlerts: 23,
    modelAccuracy: 94.7
  });

  useEffect(() => {
    // Initialize with mock data
    setAlerts(generateMockAlerts());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalEvents: prev.totalEvents + Math.floor(Math.random() * 50),
        activeAlerts: prev.activeAlerts + (Math.random() > 0.7 ? 1 : 0),
      }));

      // Occasionally add new alerts
      if (Math.random() > 0.8) {
        const newAlert = generateMockAlerts()[0];
        setAlerts(prev => [newAlert, ...prev.slice(0, 49)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Events Processed"
            value={metrics.totalEvents.toLocaleString()}
            change="+2.3% from yesterday"
            changeType="positive"
            icon={Activity}
          />
          <MetricCard
            title="Active Alerts"
            value={metrics.activeAlerts}
            change="+5 new alerts"
            changeType="negative"
            icon={AlertTriangle}
          />
          <MetricCard
            title="High Severity Alerts"
            value={metrics.highSeverityAlerts}
            change="2 critical, 21 high"
            changeType="negative"
            icon={Zap}
          />
          <MetricCard
            title="Model Accuracy"
            value={`${metrics.modelAccuracy}%`}
            change="+0.2% this week"
            changeType="positive"
            icon={Target}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Alerts Table */}
          <div className={selectedAlert ? "xl:col-span-2" : "xl:col-span-3"}>
            <AlertsTable
              alerts={alerts}
              onAlertSelect={setSelectedAlert}
              selectedAlert={selectedAlert}
            />
          </div>

          {/* Alert Detail Panel */}
          {selectedAlert && (
            <div className="xl:col-span-1">
              <AlertDetailPanel
                alert={selectedAlert}
                onClose={() => setSelectedAlert(undefined)}
              />
            </div>
          )}
        </div>

        {/* Charts Section */}
        <DashboardCharts />
      </div>
    </DashboardLayout>
  );
};

export default Index;
