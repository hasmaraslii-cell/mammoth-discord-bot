import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface Activity {
  id: string;
  type: "ban" | "kick" | "mute" | "warn" | "join" | "leave";
  user: string;
  moderator?: string;
  reason?: string;
  timestamp: Date;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const activityColors = {
  ban: "destructive",
  kick: "destructive",
  mute: "secondary",
  warn: "secondary",
  join: "default",
  leave: "secondary",
} as const;

const activityLabels = {
  ban: "Yasaklandı",
  kick: "Atıldı",
  mute: "Susturuldu",
  warn: "Uyarıldı",
  join: "Katıldı",
  leave: "Ayrıldı",
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Son Aktiviteler</CardTitle>
        <CardDescription>Sunucudaki son işlemler</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4" data-testid={`activity-${activity.id}`}>
                <Badge variant={activityColors[activity.type]}>
                  {activityLabels[activity.type]}
                </Badge>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.user}</p>
                  {activity.moderator && (
                    <p className="text-sm text-muted-foreground">
                      Yetkili: {activity.moderator}
                    </p>
                  )}
                  {activity.reason && (
                    <p className="text-xs text-muted-foreground">
                      Sebep: {activity.reason}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: tr })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
