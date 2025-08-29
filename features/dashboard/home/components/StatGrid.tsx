import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stats } from "../constant";
import { TrendingUp } from "lucide-react";

export default function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp
                  className="h-3 w-3 text-green-600"
                  aria-hidden="true"
                />
                <span className="text-green-600 font-medium">
                  {stat.change}
                </span>
                <span>from last period</span>
              </div>
              <p
                className="text-xs text-muted-foreground mt-1"
                aria-label={`${stat.title}: ${stat.description}`}
              >
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
