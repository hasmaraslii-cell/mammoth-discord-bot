import { SettingsForm } from "@/components/SettingsForm";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Ayarlar</h1>
        <p className="text-muted-foreground mt-2">
          Bot ayarlarınızı ve otomasyonlarınızı yapılandırın
        </p>
      </div>

      <SettingsForm />
    </div>
  );
}
