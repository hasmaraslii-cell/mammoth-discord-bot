import { StatCard } from "../StatCard";
import { Users } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Toplam Üye"
        value="1,247"
        description="Sunucudaki aktif üyeler"
        icon={Users}
        trend={{ value: 12, positive: true }}
      />
    </div>
  );
}
