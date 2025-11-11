import { Home, MessageSquare, Settings, Shield, Users, Activity, Smile, Plus, Bot } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Ana Sayfa",
    url: "/",
    icon: Home,
  },
  {
    title: "Mesaj Oluşturucu",
    url: "/mesaj-olustur",
    icon: MessageSquare,
  },
  {
    title: "Moderasyon",
    url: "/moderasyon",
    icon: Shield,
  },
  {
    title: "Üye Yönetimi",
    url: "/uyeler",
    icon: Users,
  },
  {
    title: "Emoji Roller",
    url: "/emoji-roller",
    icon: Smile,
  },
  {
    title: "Komutlar",
    url: "/komutlar",
    icon: Activity,
  },
  {
    title: "Ayarlar",
    url: "/ayarlar",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer hover-elevate active-elevate-2 rounded-md p-2 -m-2">
            <div className="bg-primary text-primary-foreground rounded-md p-2 flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base">Mammoth</span>
              <span className="text-xs text-muted-foreground">Discord Bot</span>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Yönetim Paneli</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.url.replace("/", "") || "home"}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Hızlı İşlemler</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton data-testid="button-quick-message">
                  <Plus className="h-4 w-4" />
                  <span>Hızlı Mesaj</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
