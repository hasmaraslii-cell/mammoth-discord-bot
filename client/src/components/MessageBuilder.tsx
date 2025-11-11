import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface ButtonAction {
  id: string;
  label: string;
  type: "role" | "dm" | "link";
  value: string;
}

export function MessageBuilder() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#5865F2");
  const [buttons, setButtons] = useState<ButtonAction[]>([]);

  const addButton = () => {
    setButtons([
      ...buttons,
      {
        id: Date.now().toString(),
        label: "",
        type: "role",
        value: "",
      },
    ]);
  };

  const removeButton = (id: string) => {
    setButtons(buttons.filter((b) => b.id !== id));
  };

  const updateButton = (id: string, field: keyof ButtonAction, value: string) => {
    setButtons(
      buttons.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Mesaj İçeriği</CardTitle>
            <CardDescription>Embed mesaj içeriğini düzenleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                placeholder="Mesaj başlığı"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                data-testid="input-message-title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                placeholder="Mesaj açıklaması"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px]"
                data-testid="input-message-description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Renk</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-20 h-10"
                  data-testid="input-message-color"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#5865F2"
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-6">
            <div>
              <CardTitle>Butonlar</CardTitle>
              <CardDescription className="mt-1">Mesaja etkileşimli butonlar ekleyin</CardDescription>
            </div>
            <Button onClick={addButton} size="sm" data-testid="button-add-button">
              <Plus className="h-4 w-4 mr-2" />
              Buton Ekle
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {buttons.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Henüz buton eklenmedi
              </p>
            )}
            {buttons.map((button) => (
              <div key={button.id} className="space-y-3 p-4 border rounded-md">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Buton #{buttons.indexOf(button) + 1}</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeButton(button.id)}
                    data-testid={`button-remove-${button.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Buton etiketi"
                    value={button.label}
                    onChange={(e) => updateButton(button.id, "label", e.target.value)}
                    data-testid={`input-button-label-${button.id}`}
                  />
                  <Select
                    value={button.type}
                    onValueChange={(value) => updateButton(button.id, "type", value)}
                  >
                    <SelectTrigger data-testid={`select-button-type-${button.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="role">Rol Ver</SelectItem>
                      <SelectItem value="dm">DM Gönder</SelectItem>
                      <SelectItem value="link">Link Aç</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder={
                      button.type === "role"
                        ? "Rol ID"
                        : button.type === "dm"
                        ? "Mesaj içeriği"
                        : "URL"
                    }
                    value={button.value}
                    onChange={(e) => updateButton(button.id, "value", e.target.value)}
                    data-testid={`input-button-value-${button.id}`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Önizleme</CardTitle>
          <CardDescription>Discord'da nasıl görüneceğini inceleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[#36393f] dark:bg-[#2f3136] rounded-md p-4 space-y-3">
            <div
              className="border-l-4 bg-[#2f3136] dark:bg-[#202225] rounded-md p-4"
              style={{ borderColor: color }}
            >
              {title && (
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              )}
              {description && (
                <p className="text-gray-300 text-sm whitespace-pre-wrap">{description}</p>
              )}
              {!title && !description && (
                <p className="text-gray-500 text-sm">Mesaj önizlemesi burada görünecek...</p>
              )}
            </div>
            {buttons.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {buttons.map((button) => (
                  <div
                    key={button.id}
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded text-sm font-medium"
                  >
                    {button.label || "Buton"}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
