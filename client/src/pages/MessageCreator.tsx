import { MessageBuilder } from "@/components/MessageBuilder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function MessageCreator() {
  const { toast } = useToast();
  const [selectedChannel, setSelectedChannel] = useState("");

  const handleSend = () => {
    console.log("Mesaj gönderiliyor, kanal:", selectedChannel);
    toast({
      title: "Mesaj gönderildi",
      description: "Butonlu mesajınız başarıyla kanalda yayınlandı.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mesaj Oluşturucu</h1>
          <p className="text-muted-foreground mt-2">
            Butonlu mesajlar oluşturun ve kanallarınızda yayınlayın
          </p>
        </div>
        <Button onClick={handleSend} data-testid="button-send-message">
          <Send className="h-4 w-4 mr-2" />
          Mesajı Gönder
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hedef Kanal</CardTitle>
          <CardDescription>Mesajın gönderileceği kanalı seçin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-w-md">
            <Label>Kanal</Label>
            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger data-testid="select-channel">
                <SelectValue placeholder="Kanal seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general"># genel</SelectItem>
                <SelectItem value="announcements"># duyurular</SelectItem>
                <SelectItem value="rules"># kurallar</SelectItem>
                <SelectItem value="welcome"># hoşgeldiniz</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <MessageBuilder />
    </div>
  );
}
