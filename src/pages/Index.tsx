import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  DollarSign
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const transactions = [
  { id: 1, name: "Salary", date: "8th Nov 2025", amount: 10000, type: "income", icon: "💰" },
  { id: 2, name: "Rental", date: "1st Nov 2025", amount: 1000, type: "income", icon: "🏠" },
  { id: 3, name: "Fruits", date: "17th Oct 2025", amount: 100, type: "expense", icon: "🍇" },
  { id: 4, name: "Interest From Saving", date: "8th Oct 2025", amount: 20000, type: "income", icon: "🏦" },
  { id: 5, name: "Petrol", date: "8th Oct 2025", amount: 4977, type: "expense", icon: "⛽" },
];

const pieData = [
  { name: "Total Balance", value: 47923, color: "hsl(262, 83%, 58%)" },
  { name: "Total Expenses", value: 13077, color: "hsl(0, 84%, 60%)" },
  { name: "Total Income", value: 61000, color: "hsl(38, 92%, 50%)" },
];

const statCards = [
  { title: "Total Balance", amount: "$47,923", icon: Wallet, color: "bg-primary" },
  { title: "Total Income", amount: "$61,000", icon: TrendingUp, color: "bg-warning" },
  { title: "Total Expenses", amount: "$13,077", icon: TrendingDown, color: "bg-destructive" },
];

export default function Index() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-shadow">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.amount}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                See All <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{transaction.icon}</span>
                    <div>
                      <p className="font-medium text-foreground">{transaction.name}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <span
                    className={`font-semibold flex items-center gap-1 ${
                      transaction.type === "income" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"} ${transaction.amount.toLocaleString()}
                    {transaction.type === "income" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Financial Overview */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(220, 13%, 91%)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <p className="text-muted-foreground">Total Balance</p>
                <p className="text-3xl font-bold text-foreground">$47,923</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
