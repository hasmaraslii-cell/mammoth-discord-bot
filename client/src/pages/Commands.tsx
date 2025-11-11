import { CommandList } from "@/components/CommandList";

export default function Commands() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Komut Yönetimi</h1>
        <p className="text-muted-foreground mt-2">
          Bot komutlarını görüntüleyin, düzenleyin ve yeni komutlar ekleyin
        </p>
      </div>

      <CommandList />
    </div>
  );
}
