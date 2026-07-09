# Stellar Crowdfund dApp — Yol Haritası

## Genel Bilgi

| Başlık | Detay |
|---|---|
| **Amaç** | Trustless milestone-based crowdfunding + fiat on-ramp + Soulbound Proof-of-Impact NFTs |
| **Program** | Stellar Journey to Mastery — Monthly Builder Challenges |
| **Yan Program** | Vibe Coding 30 (Level 4 teslim edildi ✅) |
| **Canlı (Vibe Coding)** | https://stellar-payment-dapp-chi.vercel.app |
| **Yeni Repo (Level 5+)** | https://github.com/EnesPacaci/stellar-payment-dapp-v2 |
| **Canlı (Level 5+)** | https://stellar-payment-dapp-chi.vercel.app |
| **Demo Video (L4)** | https://youtu.be/XsBphLXYVqg |
| **Eski Repo (Vibe Coding)** | https://github.com/EnesPacaci/stellar-payment-dapp |

---

## Remote Bağlantıları

| Remote | Repo | Kullanım Amacı |
|---|---|---|
| `origin` | `stellar-payment-dapp-v2` | Level 5+ geliştirme (yeni) |
| `old-origin` | `stellar-payment-dapp` | Vibe Coding teslimi (donduruldu, bozulmayacak) |

---

## Tech Stack

| Kategori | Teknoloji |
|---|---|
| Frontend | React 19 + Vite 8 + Tailwind CSS v4 + Zustand |
| Smart Contracts | Rust (soroban-sdk v26) |
| Stellar SDK | @stellar/stellar-sdk v16 |
| Wallet | @creit.tech/stellar-wallets-kit v2.4 |
| Test | Vitest + RTL (FE), cargo test (26 contract test) |
| CI/CD | GitHub Actions + Vercel |
| Lint | OxLint |
| Blockchain | Stellar Testnet (Level 4-5), Stellar Mainnet (Level 6+) |
| DeFi | Blend Protocol (Level 6+) |
| Fiat On-Ramp | SEP-24 Anchors (Level 5+) |
| Analytics | Vercel Analytics |

---

## Level 4 — Green Belt ✅ (Tamamlandı)

### Idea Submission'da Planlanan
- [x] Campaign contract: milestone escrow + weighted voting
- [x] Fund release, refund logic, edge case handling
- [x] Soulbound NFT contract with transfer restrictions
- [x] Frontend: campaign creation, donation, voting, NFT gallery
- [x] Testnet deployment + comprehensive unit tests

### Ek Olarak Yapılanlar (Plana Fazladan)
- [x] On-chain feedback sistemi (star rating + comment)
- [x] 6 farklı wallet desteği (Freighter, Albedo, LOBSTR, xBull, Rabet, Hana)
- [x] Vercel Analytics entegrasyonu
- [x] API endpoints: `/api/health`, `/api/metrics`
- [x] GitHub Actions CI/CD pipeline
- [x] Mobil responsive tasarım
- [x] Hata mesajları kullanıcı dostu hale getirildi
- [x] Auto-balance refresh (donate/withdraw/release sonrası)
- [x] 10+ kullanıcı wallet etkileşimi demo
- [x] 14 Level 4 screenshot
- [x] `docs/USER_FEEDBACK.md` (8 feedback, 4.6/5 ortalama)
- [x] README kapsamlı güncelleme

---

## Level 5 — Blue Belt (Devam Ediyor 🟢)

### Kapsam Kararı
RiseIn gereksinimlerine %100 odaklanılacak. Idea Submission'da planlanan SEP-24, KYC, Mainnet gibi büyük teknik işler Level 6'ya ertelendi.

### RiseIn Gereksinimleri & Detaylı Plan

#### A. Kod & Deployment (Zaten Tamam ✅)
- [x] Public GitHub repo (stellar-payment-dapp-v2)
- [x] 49 commit (20+ şartı fazlasıyla karşılanıyor)
- [x] Live deployed app (https://stellar-payment-dapp-chi.vercel.app)

#### B. Ürün İyileştirmeleri (Mevcut L4 Feedback'lerine Göre)
##### 1. UX/UI Geliştirmeleri (Arayüz Kalitesi)
- [x] **Görsel Milestone Timeline (Timeline Visualizer):**
  - Milestone'ları dinamik (compact/full) kronolojik yatay çizgiye dönüştür.
  - Durumları renk kodlu noktalarla bağla, overflow durumuna göre scroll + kısaltma.
- [x] **Donor Leaderboard (Bağışçı Liderlik Tablosu):**
  - RecentDonations kartına entegre, store verisinden gruplayarak en çok bağış yapan ilk 3 cüzdanı medal ikonlarıyla göster.
- [x] **Smart Budget Allocator (Akıllı Bütçe Dağıtıcı):**
  - "Distribute Equally" ile goal'i milestone'lara eşit böl.
  - "Fill Last" ile son boş milestone'a kalan bütçeyi otomatik ata.
  - Canlı balance göstergesi (yeşil Balanced / sarı X left / kırmızı X over).
- [x] **Google Forms Link in Feedback Modal:**
  - FeedbackForm bileşenine "Rate us on Google Forms →" bağlantısı eklendi (harici form, yeni sekmede açılır).

##### 2. Product Stability (Sistem Kararlılığı)
- [x] **Step-by-Step Transaction Loader (İşlem Yükleyici):**
  - Soroban işlemleri sırasında durum güncelleyen ekran (Simulating, Waiting for wallet signature, Submitting, Confirming).
  - Zaman aşımında veya hatada otomatik 3 kere yeniden deneme (retry) ve güvenli hata kurtarma (error recovery) mekanizması.
- [x] **Batch NFT Minting via bmint (Toplu NFT Basımı):**
  - Milestone release sonrası tüm destekçilere NFT'ler tek transaction'da basılır (bmint).
  - require_auth kaldırıldı (Soroban v20 frontend auth limitation).
  - Auto-mint: release sonrası frontend otomatik tetikler, ek işlem gerekmez.
- [x] **Live Wallet Account Listener (Canlı Cüzdan İzleyici):**
  - Kullanıcı Freighter/Albedo'da hesap değiştirdiğinde veya çıkış yaptığında sayfayı yenilemeden bakiyeyi ve yetkileri anında güncelle.
  - Sync butonu (manual refresh fallback) — Freighter API başarısız olursa mevcut publicKey ile çalışır
  - Bildirim mesajları (Account switched, Wallet disconnected, Wallet synced) 10sn sonra otomatik kaybolur
  - Account switched mesajı refresh'ten önce gösterilir, refresh arkada devam eder
  - Race condition fix: switchingRef ile eşzamanlı hesap değiştirme işlemleri engellendi, cancel pattern ile polling temizliği
  - Campaigns list polling: 15sn → 17sn

##### 3. Optimize Onboarding Experience (Kolay Onboarding)
- [x] **Interactive "Quick Start" Tutorial Sidebar (Rehber Paneli):**
  - Sayfanın sağında açılır-kapanır, ilk gelen kullanıcının cüzdan açmasından testnet XLM almasına kadar olan adımları gösteren görsel kontrol listesi (checklist).
  - Cüzdana tek tıkla Friendbot üzerinden XLM yükleme butonu entegrasyonu.
  - 6 adım: Connect Wallet → Get testnet XLM → Select Campaign → Donate → Vote → NFTs
  - Progress bar + her adım store state'e göre otomatik ✅ işaretlenir
  - İlk ziyarette otomatik açılır, "? butonu ile tekrar açılır

#### C. Google Form Kurulumu
- [x] Google Form oluştur (ad, e-posta, cüzdan adresi, ürün puanı [1-5], en beğenilen özellik, geliştirilmesi gereken yön)
- [x] FeedbackForm bileşenine "Rate us on Google Forms" bağlantısı eklendi (harici form, yeni sekmede açılır)
- [x] Excel/CSV yanıt şablonunu hazırla (`docs/Stellar Crowdfund — User Feedback.csv`)
- [x] 50+ kullanıcı Google Form üzerinden sisteme dahil edilecek ve on-chain işlemler gerçekleştirilecek
- [x] Google Form yanıtları toplanacak ve `docs/Stellar Crowdfund — User Feedback.csv` olarak repo'ya eklenecek
- [x] Stellar Expert üzerinden unique cüzdan işlem kanıtı screenshot'ları alınacak
- [x] Kullanıcı listesi, CSV bağlantısı ve işlem kanıtları README'ye eklenecek
- [x] İngilizce tam sunum metnini (slayt slayt) hazırla
- [x] Canva/Web sunumu oluştur (Problem → Çözüm → Pazar → Mimari → Büyüme → Yol Haritası)
- [x] PDF export/web link README'ye ekle
- [x] Video çekim senaryosunu (walkthrough) hazırla
- [x] Full product walkthrough çek (5-10 dk), yeni eklenen tüm özellikleri ve 50 kullanıcı hareketliliğini vurgula
- [x] YouTube'a yükle ve README'ye link ekle
- [x] README güncelle (İyileştirmeleri commit linkleriyle ekle, Excel linki, video linki, pitch deck linki)
- [x] `docs/USER_FEEDBACK.md` güncelle (50 kullanıcı feedback'i ve analizleri ile)
- [x] README'de toplanan yeni feedback'lere dayanarak **Level 6 Yol Haritasını** ("Next Phase Plan") yayınla

---

## Uygulama Sıralaması (Yeni ve Doğru Akış)

```
[Adım 1: UX/UI, Stability & Onboarding Kod Geliştirmeleri]
                               │
                               ▼
[Adım 2: Google Form & Excel Şablonu Hazırlanması]
                               │
                               ▼
[Adım 3: 50 Kullanıcı Edinme & Geri Bildirim Toplama]
                               │
                               ▼
[Adım 4: Pitch Deck Sunumu & Walkthrough Demo Videosu]
                               │
                               ▼
[Adım 5: README, USER_FEEDBACK, Commit Linkleri & Teslimat]
```

---

## Level 6 — Black Belt (Beklemede)

### Program Gereksinimleri (RiseIn)
- [ ] Stellar Mainnet üzerinde akıllı sözleşmelerin yayınlanması (Mainnet Deployment)
- [ ] Canlı ve üretime hazır (production-ready) web uygulamasının yayına alınması
- [ ] Minimum 20+ doğrulanmış mainnet kullanıcısı edinmek ve on-chain işlem hareketliliği sağlamak
- [ ] Akıllı sözleşme güvenlik denetimi (Audit) veya mentor onaylı güvenlik incelemesinin tamamlanması
- [ ] Twitter/X üzerinde lansman paylaşımı (Product launch post/thread) ve demo içerik tanıtımı
- [ ] Ekosisteme katkı sağlamak amacıyla teknik blog, atölye çalışması veya açık kaynak kodlu katkı yapılması
- [ ] Minimum 30+ anlamlı commit ve tam üretim ortamı kurulum dokümantasyonu

### Teknik Yol Haritası ve Gelişmiş Özellikler (Advanced Features)
- [ ] **Fee Sponsorship (Gazsız İşlemler):** Yeni bağışçıların onboarding kolaylığı için Stellar Fee Bump kullanılarak gasless işlemlerin entegre edilmesi
- [ ] **Multi-signature Logic (Çoklu İmza):** Milestone bütçelerinin serbest bırakılması ve kritik yönetim işlemleri için çoklu imza (multi-sig) onay mekanizmasının geliştirilmesi
- [ ] **Cross-border Flows (SEP-24 / SEP-31):** Cüzdana fiat on-ramp/off-ramp desteği kazandırmak için Anchor entegrasyonunun tamamlanması

---

## Level 7 — Master Belt (Beklemede)

### Idea Submission Teknik Planı
- [ ] DAO contract: proposal oluşturma, oylama, timelock execution
- [ ] On-chain dispute resolution + arbitration panel
- [ ] Sybil resistance (stake-weighted voting)
- [ ] Üçüncü taraf güvenlik auditi
- [ ] React Native mobil uygulama
- [ ] Stellar Ecosystem listing başvurusu

---

## Teknik Notlar

| # | Not |
|---|---|
| 1 | Error(Contract, #10) fix: `donate()` ve `claim_refund()` XLM transferi yapacak şekilde düzeltildi |
| 2 | Token address `DataKey::TokenAddress` olarak storage'da tutuluyor (test ortamı custom SAC kullanabilir) |
| 3 | Single donor tek başına fund release yapamaz: quorum = min 2 donor + %66 supermajority |
| 4 | Soulbound NFT'ler `transfer_from` çağrıldığında panic fırlatarak transferi engeller |
| 5 | Tüm feedback on-chain Soroban event olarak saklanır, immutable ve herkese açıktır |
