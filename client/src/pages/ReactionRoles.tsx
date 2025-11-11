import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Smile } from "lucide-react";
import { useState } from "react";

interface ReactionRole {
  id: string;
  emoji: string;
  roleId: string;
  roleName: string;
}

export default function ReactionRoles() {
  const [reactionRoles, setReactionRoles] = useState<ReactionRole[]>([
    { id: "1", emoji: "🎮", roleId: "123", roleName: "Gamer" },
    { id: "2", emoji: "🎨", roleId: "456", roleName: "Artist" },
  ]);

  const addReactionRole = () => {
    setReactionRoles([
      ...reactionRoles,
      {
        id: Date.now().toString(),
        emoji: "",
        roleId: "",
        roleName: "",
      },
    ]);
  };

  const removeReactionRole = (id: string) => {
    setReactionRoles(reactionRoles.filter((rr) => rr.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Emoji ile Rol Alma</h1>
        <p className="text-muted-foreground mt-2">
          Kullanıcıların emoji ile kolayca rol almasını sağlayın
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-6">
          <div>
            <CardTitle>Reaksiyon Rolleri</CardTitle>
            <CardDescription className="mt-1">Emoji-rol eşleştirmelerini yapılandırın</CardDescription>
          </div>
          <Button onClick={addReactionRole} data-testid="button-add-reaction-role">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Ekle
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {reactionRoles.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Henüz reaksiyon rolü eklenmedi
            </p>
          )}
          {reactionRoles.map((rr) => (
            <div key={rr.id} className="space-y-3 p-4 border rounded-md">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Reaksiyon #{reactionRoles.indexOf(rr) + 1}
                </Label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeReactionRole(rr.id)}
                  data-testid={`button-remove-reaction-${rr.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`emoji-${rr.id}`}>Emoji</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`emoji-${rr.id}`}
                      placeholder="🎮"
                      value={rr.emoji}
                      onChange={(e) => {
                        const updated = reactionRoles.map((r) =>
                          r.id === rr.id ? { ...r, emoji: e.target.value } : r
                        );
                        setReactionRoles(updated);
                      }}
                      className="text-center text-xl"
                      maxLength={2}
                      data-testid={`input-emoji-${rr.id}`}
                    />
                    <Button variant="outline" size="icon" data-testid={`button-emoji-picker-${rr.id}`}>
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`role-name-${rr.id}`}>Rol Adı</Label>
                  <Input
                    id={`role-name-${rr.id}`}
                    placeholder="Gamer"
                    value={rr.roleName}
                    onChange={(e) => {
                      const updated = reactionRoles.map((r) =>
                        r.id === rr.id ? { ...r, roleName: e.target.value } : r
                      );
                      setReactionRoles(updated);
                    }}
                    data-testid={`input-role-name-${rr.id}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`role-id-${rr.id}`}>Rol ID</Label>
                  <Input
                    id={`role-id-${rr.id}`}
                    placeholder="123456789"
                    value={rr.roleId}
                    onChange={(e) => {
                      const updated = reactionRoles.map((r) =>
                        r.id === rr.id ? { ...r, roleId: e.target.value } : r
                      );
                      setReactionRoles(updated);
                    }}
                    data-testid={`input-role-id-${rr.id}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Önizleme</CardTitle>
          <CardDescription>Kullanıcıların göreceği mesaj</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[#36393f] dark:bg-[#2f3136] rounded-md p-4">
            <div className="bg-[#2f3136] dark:bg-[#202225] border-l-4 border-primary rounded-md p-4">
              <h3 className="text-white font-semibold text-lg mb-3">Rollerini Seç</h3>
              <p className="text-gray-300 text-sm mb-4">
                Aşağıdaki emojilere tıklayarak rollerini alabilirsin!
              </p>
              <div className="space-y-2">
                {reactionRoles.map((rr) => (
                  <div key={rr.id} className="flex items-center gap-3 text-white">
                    <span className="text-xl">{rr.emoji || "❓"}</span>
                    <span className="text-sm">{rr.roleName || "Rol Adı"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button data-testid="button-save-reaction-roles">Kaydet ve Yayınla</Button>
      </div>
    </div>
  );
}
