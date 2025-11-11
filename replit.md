# 🦣 Mammoth Discord Bot

Kapsamlı web panelli Türkçe Discord botu - discord.js v14

## 🎯 Özellikler

### ✅ Tamamlanan Özellikler

#### 🎨 Web Yönetim Paneli
- Modern, responsive tasarım (açık/koyu tema)
- Kontrol paneli ile istatistikler
- Mesaj oluşturucu (butonlu mesajlar)
- Moderasyon merkezi
- Üye yönetimi
- Komut yönetimi
- Ayarlar sayfası
- Emoji ile rol alma sistemi

#### 🤖 Discord Bot Özellikleri
- **Slash Komutları:**
  - `/ban` - Kullanıcı yasaklama
  - `/kick` - Kullanıcı atma
  - `/mute` - Kullanıcı susturma
  - `/warn` - Kullanıcı uyarma
  - `/avatar` - Avatar görüntüleme
  - `/sunucubilgi` - Sunucu bilgileri
  - `/kullanicibilgi` - Kullanıcı bilgileri
  - `/ayarlar` - Bot ayarlarını görüntüleme

- **Otomatik Moderasyon:**
  - Reklam engelleme (Discord davet linkleri)
  - Spam koruması (5 saniyede 5+ mesaj = otomatik mute)
  - Log sistemi (tüm moderasyon işlemleri kaydedilir)

- **Otomasyon:**
  - Yeni üyelere otomatik rol verme
  - Karşılama mesajı gönderme
  - Üye sayacı

- **Butonlu Mesaj Sistemi:**
  - Rol verme butonları
  - DM gönderme butonları
  - Link butonları
  - Web panelinden yönetim

- **Emoji ile Rol Alma:**
  - Mesajlara emoji reaction ile rol alma/bırakma
  - Otomatik rol yönetimi

## 🚀 Kurulum

### 1. Discord Bot Oluşturma

1. [Discord Developer Portal](https://discord.com/developers/applications)'a gidin
2. "New Application" butonuna tıklayın
3. Botunuza bir isim verin (örn: Mammoth)
4. "Bot" sekmesine gidin
5. "Add Bot" butonuna tıklayın
6. Bot tokenınızı kopyalayın

### 2. Bot İzinlerini Ayarlama

"Bot" sekmesinde şu izinleri etkinleştirin:
- **Privileged Gateway Intents:**
  - ✅ Presence Intent
  - ✅ Server Members Intent
  - ✅ Message Content Intent

"OAuth2" > "URL Generator" sekmesinde:
- **Scopes:** `bot`, `applications.commands`
- **Bot Permissions:**
  - Administrator (veya ihtiyacınıza göre özel izinler)

### 3. Replit Secrets Yapılandırması

Replit'te "Secrets" (🔒) sekmesine gidin ve aşağıdaki değerleri ekleyin:

```
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_application_id_here
```

- `DISCORD_TOKEN`: Bot tokenınız (Bot sekmesinden)
- `DISCORD_CLIENT_ID`: Application ID (General Information'dan)

### 4. Botu Sunucunuza Ekleme

URL Generator'dan oluşturulan linki kullanarak botunuzu sunucunuza ekleyin.

## 📝 Kullanım

### Web Paneli

Web paneli otomatik olarak çalışıyor. Tarayıcınızda Replit preview penceresinde görebilirsiniz.

**Önemli Not:** Şu anda web paneli demo modunda çalışıyor. Discord bot tokenı ekledikten sonra:
- Gerçek sunucu bilgileriniz görünecek
- Mesajlar Discord'a gönderilecek
- Moderasyon işlemleri gerçekleşecek

### Discord Komutları

Bot sunucunuza eklendikten sonra slash komutları otomatik olarak kaydedilecektir:

```
/ban @kullanıcı sebep:"Reklam spam"
/kick @kullanıcı sebep:"Kural ihlali"
/mute @kullanıcı süre:30 sebep:"Küfür"
/warn @kullanıcı sebep:"Spam"
/avatar @kullanıcı
/sunucubilgi
/kullanicibilgi @kullanıcı
/ayarlar
```

### Butonlu Mesaj Oluşturma

1. Web panelinde "Mesaj Oluşturucu" sayfasına gidin
2. Mesaj içeriğini doldurun:
   - Başlık
   - Açıklama
   - Renk
3. "Buton Ekle" ile butonlar ekleyin:
   - **Rol Ver:** Kullanıcıya belirtilen rolü verir/alır
   - **DM Gönder:** Kullanıcıya özel mesaj gönderir
   - **Link Aç:** Belirtilen URL'yi açar
4. Kanalı seçin ve "Mesajı Gönder"

### Otomatik Moderasyon Ayarlama

1. Web panelinde "Ayarlar" sayfasına gidin
2. "Moderasyon" sekmesini seçin
3. İstediğiniz özellikleri etkinleştirin:
   - **Reklam Engelleme:** Discord davet linklerini otomatik siler
   - **Spam Koruması:** Hızlı mesajlaşanları susturur
   - **Küfür Filtresi:** (Yakında)

### Karşılama Mesajı Ayarlama

1. "Ayarlar" > "Otomasyon" sekmesine gidin
2. "Karşılama Mesajını Etkinleştir" anahtarını açın
3. Mesajı özelleştirin:
   - `{user}` - Kullanıcı mention
   - `{username}` - Kullanıcı adı
   - `{server}` - Sunucu adı

### Emoji ile Rol Alma

1. "Emoji Roller" sayfasına gidin
2. Her emoji-rol eşleştirmesi için:
   - Emoji seçin
   - Rol adını yazın
   - Rol ID'sini girin
3. "Kaydet ve Yayınla" ile mesajı Discord'a gönderin
4. Kullanıcılar emojilere basarak rol alabilir/bırakabilir

## 🗄️ Veritabanı

Proje PostgreSQL kullanıyor. Tüm veriler şu tablolarda saklanıyor:

- `guild_settings` - Sunucu ayarları
- `button_messages` - Butonlu mesaj şablonları
- `commands` - Komut yapılandırmaları
- `moderation_logs` - Moderasyon logları
- `reaction_roles` - Emoji rol eşleştirmeleri

## 🔧 Teknik Detaylar

### Teknoloji Stack

**Frontend:**
- React + TypeScript
- Tailwind CSS + Shadcn UI
- React Query (veri yönetimi)
- Wouter (routing)

**Backend:**
- Express.js
- Discord.js v14
- PostgreSQL + Drizzle ORM
- TypeScript

**Discord Bot:**
- Event-based architecture
- Slash commands
- Button interactions
- Reaction roles
- Auto-moderation

### Proje Yapısı

```
├── bot/
│   ├── commands/          # Slash komutları
│   ├── events/            # Discord event handlers
│   ├── utils/             # Yardımcı fonksiyonlar
│   └── index.ts           # Bot başlatıcı
├── client/
│   └── src/
│       ├── components/    # React bileşenleri
│       ├── pages/         # Sayfa bileşenleri
│       └── App.tsx        # Ana uygulama
├── server/
│   ├── routes.ts          # API rotaları
│   ├── storage.ts         # Veritabanı işlemleri
│   └── index.ts           # Express server
└── shared/
    └── schema.ts          # Veritabanı şeması
```

## 🐛 Sorun Giderme

### Bot çevrimdışı görünüyor
1. DISCORD_TOKEN'ın doğru olduğundan emin olun
2. Bot izinlerinin etkin olduğunu kontrol edin
3. Replit'i yeniden başlatın

### Komutlar görünmüyor
1. Bot'un sunucunuzda olduğundan emin olun
2. Bot'un `applications.commands` iznine sahip olduğunu kontrol edin
3. Birkaç dakika bekleyin (Discord komutları cache'ler)

### Butonlar çalışmıyor
1. Bot'un ilgili rol izinlerine sahip olduğunu kontrol edin
2. Rol ID'lerinin doğru olduğundan emin olun
3. Bot'un rolünün verilecek rolden daha yüksekte olduğunu kontrol edin

## 📚 Kaynaklar

- [Discord.js Dokümantasyonu](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Replit Dökümanları](https://docs.replit.com/)

## ⚠️ Önemli Notlar

1. **Token Güvenliği:** Bot tokenınızı asla paylaşmayın
2. **Rate Limits:** Discord API rate limitlerini aşmamak için dikkatli olun
3. **Yedekleme:** Önemli verileri düzenli olarak yedekleyin
4. **İzinler:** Bot'un sadece ihtiyaç duyduğu izinlere sahip olmasını sağlayın

## 🔮 Gelecek Özellikler

- Ticket/destek sistemi
- Seviye ve XP sistemi
- Özel otomasyon kuralları
- İstatistik ve analiz dashboard'u
- Gelişmiş moderasyon (oto-mod kuralları)

---

**Mammoth Bot** - Sunucunuzu profesyonelce yönetin 🦣
