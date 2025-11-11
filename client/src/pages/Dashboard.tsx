import { StatCard } from "@/components/StatCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Users, MessageSquare, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const mockActivities = [
  {
    id: "1",
    type: "ban" as const,
    user: "SpammerUser#1234",
    moderator: "Admin#9999",
    reason: "Reklam spam",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    type: "join" as const,
    user: "NewMember#5678",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "3",
    type: "mute" as const,
    user: "ToxicUser#4321",
    moderator: "Mod#7777",
    reason: "Küfür",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "4",
    type: "join" as const,
    user: "HappyUser#9876",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: "5",
    type: "warn" as const,
    user: "RuleBreaker#1111",
    moderator: "Mod#7777",
    reason: "Kural ihlali",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Kontrol Paneli</h1>
        <p className="text-muted-foreground mt-2">
          Mammoth bot istatistiklerinize ve son aktivitelere göz atın
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Toplam Üye"
          value="1,247"
          description="Sunucudaki aktif üyeler"
          icon={Users}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Komut Kullanımı"
          value="3,482"
          description="Son 30 günde"
          icon={MessageSquare}
          trend={{ value: 23, positive: true }}
        />
        <StatCard
          title="Moderasyon İşlemleri"
          value="47"
          description="Son 30 günde"
          icon={Shield}
        />
        <StatCard
          title="Aktif Üyeler"
          value="892"
          description="Son 7 günde aktif"
          icon={TrendingUp}
          trend={{ value: 8, positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed activities={mockActivities} />
        
        <Card>
          <CardHeader>
            <CardTitle>Yeni Üyeler</CardTitle>
            <CardDescription>Son 24 saatte katılan üyeler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["NewMember#5678", "HappyUser#9876", "CoolPerson#3333", "GamerPro#4444"].map((user, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user}</p>
                    <p className="text-xs text-muted-foreground">{index + 1} saat önce</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
