import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Crown, Shield } from "lucide-react";
import { useState } from "react";

interface Member {
  id: string;
  username: string;
  discriminator: string;
  roles: string[];
  joinedAt: Date;
  isOnline: boolean;
}

const mockMembers: Member[] = [
  {
    id: "1",
    username: "Admin",
    discriminator: "9999",
    roles: ["Yönetici", "Moderatör"],
    joinedAt: new Date("2023-01-15"),
    isOnline: true,
  },
  {
    id: "2",
    username: "Moderator",
    discriminator: "7777",
    roles: ["Moderatör"],
    joinedAt: new Date("2023-03-20"),
    isOnline: true,
  },
  {
    id: "3",
    username: "ActiveUser",
    discriminator: "1234",
    roles: ["Üye", "Aktif"],
    joinedAt: new Date("2024-01-10"),
    isOnline: false,
  },
  {
    id: "4",
    username: "NewMember",
    discriminator: "5678",
    roles: ["Üye"],
    joinedAt: new Date("2024-11-01"),
    isOnline: true,
  },
];

export default function Members() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = mockMembers.filter((member) =>
    `${member.username}#${member.discriminator}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Üye Yönetimi</h1>
        <p className="text-muted-foreground mt-2">
          Sunucu üyelerini görüntüleyin ve yönetin
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Üyeler</CardTitle>
          <CardDescription>Toplam {mockMembers.length} üye</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Üye ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-members"
            />
          </div>

          <div className="space-y-3">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between gap-4 p-4 border rounded-md hover-elevate"
                data-testid={`member-${member.id}`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                        member.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {member.username}#{member.discriminator}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {member.roles.map((role, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {role === "Yönetici" && <Crown className="h-3 w-3 mr-1" />}
                          {role === "Moderatör" && <Shield className="h-3 w-3 mr-1" />}
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {member.joinedAt.toLocaleDateString("tr-TR")}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-1" data-testid={`button-manage-${member.id}`}>
                    Yönet
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
