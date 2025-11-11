import { ModerationPanel } from "@/components/ModerationPanel";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Ban, MessageSquareOff } from "lucide-react";

const mockLogs = [
  {
    id: "1",
    type: "ban" as const,
    user: "SpammerUser#1234",
    moderator: "Admin#9999",
    reason: "Reklam spam - tekrarlayan ihlal",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    type: "mute" as const,
    user: "ToxicUser#4321",
    moderator: "Mod#7777",
    reason: "Küfür ve hakaret",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "3",
    type: "warn" as const,
    user: "RuleBreaker#1111",
    moderator: "Mod#7777",
    reason: "Kural ihlali - off-topic spam",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "4",
    type: "kick" as const,
    user: "Troublemaker#5555",
    moderator: "Admin#9999",
    reason: "Sürekli rahatsız edici davranış",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
  },
];

export default function Moderation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Moderasyon Merkezi</h1>
        <p className="text-muted-foreground mt-2">
          Sunucu moderasyon işlemlerini yönetin ve logları inceleyin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yasaklamalar</CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Son 30 gün</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Susturmalar</CardTitle>
            <MessageSquareOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Son 30 gün</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uyarılar</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Son 30 gün</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam İşlem</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82</div>
            <p className="text-xs text-muted-foreground">Son 30 gün</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ModerationPanel />
        <ActivityFeed activities={mockLogs} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Otomatik Moderasyon</CardTitle>
          <CardDescription>Aktif koruma kuralları</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <p className="text-sm font-medium">Reklam Engelleme</p>
                <p className="text-xs text-muted-foreground">Discord davet linkleri otomatik silinir</p>
              </div>
              <Badge>Aktif</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <p className="text-sm font-medium">Spam Koruması</p>
                <p className="text-xs text-muted-foreground">5 saniyede 4+ mesaj = otomatik mute</p>
              </div>
              <Badge>Aktif</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <p className="text-sm font-medium">Küfür Filtresi</p>
                <p className="text-xs text-muted-foreground">Uygunsuz kelimeler otomatik silinir</p>
              </div>
              <Badge variant="secondary">Pasif</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
