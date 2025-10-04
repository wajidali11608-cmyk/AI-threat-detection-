import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

// Mock data
const eventsData = [
  { time: "00:00", events: 1200 },
  { time: "01:00", events: 950 },
  { time: "02:00", events: 800 },
  { time: "03:00", events: 1100 },
  { time: "04:00", events: 1350 },
  { time: "05:00", events: 1600 },
  { time: "06:00", events: 2100 },
  { time: "07:00", events: 2800 },
  { time: "08:00", events: 3200 },
  { time: "09:00", events: 2900 },
  { time: "10:00", events: 2600 },
  { time: "11:00", events: 2400 },
];

const alertsBySeverity = [
  { severity: "Critical", count: 23, color: "hsl(0, 84%, 60%)" },
  { severity: "High", count: 45, color: "hsl(14, 100%, 57%)" },
  { severity: "Medium", count: 78, color: "hsl(39, 100%, 50%)" },
  { severity: "Low", count: 156, color: "hsl(45, 93%, 47%)" },
  { severity: "Info", count: 289, color: "hsl(195, 100%, 50%)" },
];

const alertTypes = [
  { name: "Malware", value: 35, color: "hsl(0, 84%, 60%)" },
  { name: "Suspicious Login", value: 28, color: "hsl(14, 100%, 57%)" },
  { name: "Data Exfiltration", value: 18, color: "hsl(39, 100%, 50%)" },
  { name: "Network Anomaly", value: 12, color: "hsl(45, 93%, 47%)" },
  { name: "Other", value: 7, color: "hsl(195, 100%, 50%)" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/50 p-3 rounded-lg shadow-card">
        <p className="text-sm text-foreground">{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Events per Minute */}
      <Card className="lg:col-span-2 bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Events per Hour (Last 12 Hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={eventsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="events" 
                stroke="hsl(var(--neon-green))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--neon-green))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--neon-green))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alert Types Distribution */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Alert Types Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={alertTypes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {alertTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border/50 p-3 rounded-lg shadow-card">
                        <p className="text-sm text-foreground">
                          {`${payload[0].name}: ${payload[0].value}%`}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                wrapperStyle={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alerts by Severity */}
      <Card className="lg:col-span-2 xl:col-span-3 bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Alerts by Severity (Last 24 Hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={alertsBySeverity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="severity" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                radius={[4, 4, 0, 0]}
                fill="hsl(var(--neon-blue))"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}