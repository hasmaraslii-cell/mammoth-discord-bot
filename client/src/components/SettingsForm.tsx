import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function SettingsForm() {
  const { toast } = useToast();
  const [prefix, setPrefix] = useState("!");
  const [welcomeEnabled, setWelcomeEnabled] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("Hoş geldin {user}! Sunucumuza katıldığın için teşekkürler.");
  const [autoRoleEnabled, setAutoRoleEnabled] = useState(false);
  const [autoRoleId, setAutoRoleId] = useState("");

  const handleSave = () => {
    console.log("Ayarlar kaydedildi:", { prefix, welcomeEnabled, welcomeMessage, autoRoleEnabled, autoRoleId });
    toast({
      title: "Ayarlar kaydedildi",
      description: "Bot ayarlarınız başarıyla güncellendi.",
    });
  };

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList>
        <TabsTrigger value="general" data-testid="tab-general">Genel</TabsTrigger>
        <TabsTrigger value="automation" data-testid="tab-automation">Otomasyon</TabsTrigger>
        <TabsTrigger value="moderation" data-testid="tab-moderation">Moderasyon</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Genel Ayarlar</CardTitle>
            <CardDescription>Bot komut öneki ve temel ayarlar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prefix">Komut Öneki</Label>
              <Input
                id="prefix"
                placeholder="!"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="max-w-xs"
                data-testid="input-prefix"
              />
              <p className="text-sm text-muted-foreground">
                Komutlarınız bu önek ile başlayacak. Örnek: {prefix}ban
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="automation" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Karşılama Mesajı</CardTitle>
            <CardDescription>Yeni üyelere gönderilecek karşılama mesajı</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Karşılama Mesajını Etkinleştir</Label>
                <p className="text-sm text-muted-foreground">
                  Yeni üyelere otomatik mesaj gönder
                </p>
              </div>
              <Switch
                checked={welcomeEnabled}
                onCheckedChange={setWelcomeEnabled}
                data-testid="switch-welcome"
              />
            </div>
            {welcomeEnabled && (
              <div className="space-y-2">
                <Label htmlFor="welcome-message">Mesaj</Label>
                <Input
                  id="welcome-message"
                  placeholder="Karşılama mesajı"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  data-testid="input-welcome-message"
                />
                <p className="text-sm text-muted-foreground">
                  {"{user}"} kullanıcı adını temsil eder
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Otomatik Rol</CardTitle>
            <CardDescription>Yeni üyelere otomatik verilecek rol</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Otomatik Rol Vermeyi Etkinleştir</Label>
                <p className="text-sm text-muted-foreground">
                  Yeni üyelere belirtilen rolü otomatik ver
                </p>
              </div>
              <Switch
                checked={autoRoleEnabled}
                onCheckedChange={setAutoRoleEnabled}
                data-testid="switch-autorole"
              />
            </div>
            {autoRoleEnabled && (
              <div className="space-y-2">
                <Label htmlFor="auto-role-id">Rol ID</Label>
                <Input
                  id="auto-role-id"
                  placeholder="123456789012345678"
                  value={autoRoleId}
                  onChange={(e) => setAutoRoleId(e.target.value)}
                  data-testid="input-autorole-id"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="moderation" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Moderasyon Ayarları</CardTitle>
            <CardDescription>Otomatik moderasyon özellikleri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reklam Engelleme</Label>
                <p className="text-sm text-muted-foreground">
                  Discord davet linklerini otomatik engelle
                </p>
              </div>
              <Switch data-testid="switch-anti-ad" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Spam Koruması</Label>
                <p className="text-sm text-muted-foreground">
                  Hızlı mesajlaşmayı engelle
                </p>
              </div>
              <Switch data-testid="switch-anti-spam" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Küfür Filtresi</Label>
                <p className="text-sm text-muted-foreground">
                  Uygunsuz kelimeleri filtrele
                </p>
              </div>
              <Switch data-testid="switch-profanity-filter" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <div className="flex justify-end">
        <Button onClick={handleSave} data-testid="button-save-settings">
          Ayarları Kaydet
        </Button>
      </div>
    </Tabs>
  );
}
