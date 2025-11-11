import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ban, UserMinus, MessageSquareOff, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type ActionType = "ban" | "kick" | "mute" | "warn";

export function ModerationPanel() {
  const { toast } = useToast();
  const [actionType, setActionType] = useState<ActionType>("ban");
  const [userId, setUserId] = useState("");
  const [reason, setReason] = useState("");

  const handleAction = () => {
    console.log("Moderasyon işlemi:", { actionType, userId, reason });
    toast({
      title: "İşlem başarılı",
      description: `Kullanıcıya ${actionLabels[actionType]} işlemi uygulandı.`,
    });
    setUserId("");
    setReason("");
  };

  const actionLabels = {
    ban: "yasaklama",
    kick: "atma",
    mute: "susturma",
    warn: "uyarı",
  };

  const actionIcons = {
    ban: Ban,
    kick: UserMinus,
    mute: MessageSquareOff,
    warn: AlertTriangle,
  };

  const Icon = actionIcons[actionType];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderasyon İşlemleri</CardTitle>
        <CardDescription>Kullanıcılara moderasyon eylemleri uygulayın</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>İşlem Türü</Label>
          <Select value={actionType} onValueChange={(value) => setActionType(value as ActionType)}>
            <SelectTrigger data-testid="select-action-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ban">
                <div className="flex items-center gap-2">
                  <Ban className="h-4 w-4" />
                  <span>Yasakla (Ban)</span>
                </div>
              </SelectItem>
              <SelectItem value="kick">
                <div className="flex items-center gap-2">
                  <UserMinus className="h-4 w-4" />
                  <span>At (Kick)</span>
                </div>
              </SelectItem>
              <SelectItem value="mute">
                <div className="flex items-center gap-2">
                  <MessageSquareOff className="h-4 w-4" />
                  <span>Sustur (Mute)</span>
                </div>
              </SelectItem>
              <SelectItem value="warn">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Uyar (Warn)</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="user-id">Kullanıcı ID</Label>
          <Input
            id="user-id"
            placeholder="123456789012345678"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            data-testid="input-user-id"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Sebep</Label>
          <Textarea
            id="reason"
            placeholder="İşlem sebebini yazın..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
            data-testid="input-reason"
          />
        </div>

        <Button
          onClick={handleAction}
          variant={actionType === "ban" || actionType === "kick" ? "destructive" : "default"}
          className="w-full"
          data-testid="button-execute-action"
        >
          <Icon className="h-4 w-4 mr-2" />
          {actionType === "ban" && "Kullanıcıyı Yasakla"}
          {actionType === "kick" && "Kullanıcıyı At"}
          {actionType === "mute" && "Kullanıcıyı Sustur"}
          {actionType === "warn" && "Kullanıcıyı Uyar"}
        </Button>
      </CardContent>
    </Card>
  );
}
