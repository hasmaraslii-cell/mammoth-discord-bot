import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

interface Command {
  id: string;
  name: string;
  description: string;
  category: "moderation" | "fun" | "utility" | "custom";
  enabled: boolean;
}

const mockCommands: Command[] = [
  { id: "1", name: "ban", description: "Kullanıcıyı sunucudan yasaklar", category: "moderation", enabled: true },
  { id: "2", name: "kick", description: "Kullanıcıyı sunucudan atar", category: "moderation", enabled: true },
  { id: "3", name: "mute", description: "Kullanıcıyı susturur", category: "moderation", enabled: true },
  { id: "4", name: "avatar", description: "Kullanıcının avatarını gösterir", category: "fun", enabled: true },
  { id: "5", name: "sunucubilgi", description: "Sunucu bilgilerini gösterir", category: "utility", enabled: true },
];

const categoryLabels = {
  moderation: "Moderasyon",
  fun: "Eğlence",
  utility: "Yardımcı",
  custom: "Özel",
};

const categoryColors = {
  moderation: "destructive",
  fun: "default",
  utility: "secondary",
  custom: "default",
} as const;

export function CommandList() {
  const [commands] = useState(mockCommands);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCommand = (id: string) => {
    console.log("Toggle command:", id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Komut ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-commands"
          />
        </div>
        <Button data-testid="button-add-command">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Komut
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Komutlar</CardTitle>
          <CardDescription>Bot komutlarını yönetin ve düzenleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCommands.map((command) => (
              <div
                key={command.id}
                className="flex items-center justify-between gap-4 p-4 border rounded-md"
                data-testid={`command-${command.id}`}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {command.name}
                    </code>
                    <Badge variant={categoryColors[command.category]}>
                      {categoryLabels[command.category]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{command.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={command.enabled}
                    onCheckedChange={() => toggleCommand(command.id)}
                    data-testid={`switch-command-${command.id}`}
                  />
                  <Button variant="ghost" size="icon" data-testid={`button-edit-${command.id}`}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  {command.category === "custom" && (
                    <Button variant="ghost" size="icon" data-testid={`button-delete-${command.id}`}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
