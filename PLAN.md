# Stellar Crowdfund dApp — Yol Haritası

## Genel Bilgi

| Başlık | Detay |
|---|---|
| **Amaç** | Trustless milestone-based crowdfunding + fiat on-ramp + Soulbound Proof-of-Impact NFTs |
| **Program** | Stellar Journey to Mastery — Monthly Builder Challenges |
| **Yan Program** | Vibe Coding 30 (Level 4 teslim edildi ✅) |
| **Canlı (Vibe Coding)** | https://stellar-payment-dapp-chi.vercel.app |
| **Yeni Repo (Level 5+)** | https://github.com/EnesPacaci/stellar-payment-dapp-v2 |
| **Canlı (Level 5+)** | https://stellar-payment-dapp-v2.vercel.app |
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
- [x] Live deployed app (https://stellar-payment-dapp-v2.vercel.app)

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

##### 2. Product Stability (Sistem Kararlılığı)
- [x] **Step-by-Step Transaction Loader (İşlem Yükleyici):**
  - Soroban işlemleri sırasında durum güncelleyen ekran (Simulating, Waiting for wallet signature, Submitting, Confirming).
  - Zaman aşımında veya hatada otomatik 3 kere yeniden deneme (retry) ve güvenli hata kurtarma (error recovery) mekanizması.
- [x] **Live Wallet Account Listener (Canlı Cüzdan İzleyici):**
  - Kullanıcı Freighter/Albedo'da hesap değiştirdiğinde veya çıkış yaptığında sayfayı yenilemeden bakiyeyi ve yetkileri anında güncelle.
  - Sync butonu (manual refresh fallback) — Freighter API başarısız olursa mevcut publicKey ile çalışır
  - Bildirim mesajları (Account switched, Wallet disconnected, Wallet synced) 10sn sonra otomatik kaybolur
  - Account switched mesajı refresh'ten önce gösterilir, refresh arkada devam eder
  - Campaigns list polling: 15sn → 17sn

##### 3. Optimize Onboarding Experience (Kolay Onboarding)
- [x] **Interactive "Quick Start" Tutorial Sidebar (Rehber Paneli):**
  - Sayfanın sağında açılır-kapanır, ilk gelen kullanıcının cüzdan açmasından testnet XLM almasına kadar olan adımları gösteren görsel kontrol listesi (checklist).
  - Cüzdana tek tıkla Friendbot üzerinden XLM yükleme butonu entegrasyonu.
  - 6 adım: Connect Wallet → Get testnet XLM → Select Campaign → Donate → Vote → NFTs
  - Progress bar + her adım store state'e göre otomatik ✅ işaretlenir
  - İlk ziyarette otomatik açılır, "? butonu ile tekrar açılır

#### C. Google Form Kurulumu (İyileştirmeler Bittikten Sonra)
- [ ] Google Form oluştur (ad, e-posta, cüzdan adresi, ürün puanı [1-5], en beğenilen özellik, geliştirilmesi gereken yön)
- [ ] Excel/CSV yanıt şablonunu hazırla (`docs/user_onboarding_responses.csv`)

#### D. Kullanıcı Büyütme (50+ Testnet Kullanıcısı)
- [x] 50+ kullanıcı Google Form üzerinden sisteme dahil edildi ve on-chain işlemler gerçekleştirildi
- [x] Google Form yanıtları toplandı ve `docs/user_onboarding_responses.csv` olarak repo'ya eklendi
- [x] Stellar Expert üzerinden unique cüzdan işlem kanıtı screenshot'ları alındı
- [x] Kullanıcı listesi, CSV bağlantısı ve işlem kanıtları README'ye eklendi

#### E. Pitch Deck
- [ ] İngilizce tam sunum metnini (slayt slayt) hazırla
- [ ] Canva sunumu oluştur (Problem → Çözüm → Pazar → Mimari → Büyüme → Yol Haritası)
- [ ] PDF export al ve README'ye ekle

#### F. Demo Video
- [ ] Video çekim senaryosunu (walkthrough) hazırla
- [ ] Full product walkthrough çek (5-10 dk), yeni eklenen tüm özellikleri ve 50 kullanıcı hareketliliğini vurgula
- [ ] YouTube'a yükle ve README'ye link ekle

#### G. Son Dokümantasyon
- [ ] README güncelle (İyileştirmeleri commit linkleriyle ekle, Excel linki, video linki, pitch deck linki)
- [ ] `docs/USER_FEEDBACK.md` güncelle (50 kullanıcı feedback'i ve analizleri ile)
- [ ] README'de toplanan yeni feedback'lere dayanarak **Level 6 Yol Haritasını** ("Next Phase Plan") yayınla

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
- [ ] Twitter profili oluşturma + proje ile ilgili düzenli paylaşımlar
- [ ] 30+ yeni kullanıcı onboard etme
- [ ] Stellar Mainnet geçişi
- [ ] 20+ gerçek mainnet kullanıcısı
- [ ] Security review / audit

### Idea Submission Teknik Planı
- [ ] Blend Protocol entegrasyonu (boş kampanya fonlarından yield)
- [ ] Flash loan koruması + withdrawal queue yönetimi
- [ ] Decentralized verifier staking + slashing mekanizması
- [ ] Reputasyon sistemi (doğruluk ve katılım bazlı)
- [ ] NFT metadata upgradeability (dinamik reward içeriği)

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
