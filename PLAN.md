# Stellar Crowdfund dApp â€” Yol HaritasÄ±

## Genel Bilgi

| BaÅŸlÄ±k | Detay |
|---|---|
| **AmaÃ§** | Trustless milestone-based crowdfunding + fiat on-ramp + Soulbound Proof-of-Impact NFTs |
| **Program** | Stellar Journey to Mastery â€” Monthly Builder Challenges |
| **Yan Program** | Vibe Coding 30 (Level 4 teslim edildi âœ…) |
| **CanlÄ± (Vibe Coding)** | https://stellar-payment-dapp-chi.vercel.app |
| **Yeni Repo (Level 5+)** | https://github.com/EnesPacaci/stellar-payment-dapp-v2 |
| **CanlÄ± (Level 5+)** | https://stellar-payment-dapp-v2.vercel.app |
| **Demo Video (L4)** | https://youtu.be/XsBphLXYVqg |
| **Eski Repo (Vibe Coding)** | https://github.com/EnesPacaci/stellar-payment-dapp |

---

## Remote BaÄŸlantÄ±larÄ±

| Remote | Repo | KullanÄ±m AmacÄ± |
|---|---|---|
| `origin` | `stellar-payment-dapp-v2` | Level 5+ geliÅŸtirme (yeni) |
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

## Level 4 â€” Green Belt âœ… (TamamlandÄ±)

### Idea Submission'da Planlanan
- [x] Campaign contract: milestone escrow + weighted voting
- [x] Fund release, refund logic, edge case handling
- [x] Soulbound NFT contract with transfer restrictions
- [x] Frontend: campaign creation, donation, voting, NFT gallery
- [x] Testnet deployment + comprehensive unit tests

### Ek Olarak YapÄ±lanlar (Plana Fazladan)
- [x] On-chain feedback sistemi (star rating + comment)
- [x] 6 farklÄ± wallet desteÄŸi (Freighter, Albedo, LOBSTR, xBull, Rabet, Hana)
- [x] Vercel Analytics entegrasyonu
- [x] API endpoints: `/api/health`, `/api/metrics`
- [x] GitHub Actions CI/CD pipeline
- [x] Mobil responsive tasarÄ±m
- [x] Hata mesajlarÄ± kullanÄ±cÄ± dostu hale getirildi
- [x] Auto-balance refresh (donate/withdraw/release sonrasÄ±)
- [x] 10+ kullanÄ±cÄ± wallet etkileÅŸimi demo
- [x] 14 Level 4 screenshot
- [x] `docs/USER_FEEDBACK.md` (8 feedback, 4.6/5 ortalama)
- [x] README kapsamlÄ± gÃ¼ncelleme

---

## Level 5 â€” Blue Belt (Devam Ediyor ğŸŸ¢)

### Kapsam KararÄ±
RiseIn gereksinimlerine %100 odaklanÄ±lacak. Idea Submission'da planlanan SEP-24, KYC, Mainnet gibi bÃ¼yÃ¼k teknik iÅŸler Level 6'ya ertelendi.

### RiseIn Gereksinimleri & DetaylÄ± Plan

#### A. Kod & Deployment (Zaten Tamam âœ…)
- [x] Public GitHub repo (stellar-payment-dapp-v2)
- [x] 49 commit (20+ ÅŸartÄ± fazlasÄ±yla karÅŸÄ±lanÄ±yor)
- [x] Live deployed app (https://stellar-payment-dapp-v2.vercel.app)

#### B. ÃœrÃ¼n Ä°yileÅŸtirmeleri (Mevcut L4 Feedback'lerine GÃ¶re)
##### 1. UX/UI GeliÅŸtirmeleri (ArayÃ¼z Kalitesi)
- [x] **GÃ¶rsel Milestone Timeline (Timeline Visualizer):**
  - Milestone'larÄ± dinamik (compact/full) kronolojik yatay Ã§izgiye dÃ¶nÃ¼ÅŸtÃ¼r.
  - DurumlarÄ± renk kodlu noktalarla baÄŸla, overflow durumuna gÃ¶re scroll + kÄ±saltma.
- [x] **Donor Leaderboard (BaÄŸÄ±ÅŸÃ§Ä± Liderlik Tablosu):**
  - RecentDonations kartÄ±na entegre, store verisinden gruplayarak en Ã§ok baÄŸÄ±ÅŸ yapan ilk 3 cÃ¼zdanÄ± medal ikonlarÄ±yla gÃ¶ster.
- [x] **Smart Budget Allocator (AkÄ±llÄ± BÃ¼tÃ§e DaÄŸÄ±tÄ±cÄ±):**
  - "Distribute Equally" ile goal'i milestone'lara eÅŸit bÃ¶l.
  - "Fill Last" ile son boÅŸ milestone'a kalan bÃ¼tÃ§eyi otomatik ata.
  - CanlÄ± balance gÃ¶stergesi (yeÅŸil Balanced / sarÄ± X left / kÄ±rmÄ±zÄ± X over).

##### 2. Product Stability (Sistem KararlÄ±lÄ±ÄŸÄ±)
- [x] **Step-by-Step Transaction Loader (Ä°ÅŸlem YÃ¼kleyici):**
  - Soroban iÅŸlemleri sÄ±rasÄ±nda durum gÃ¼ncelleyen ekran (Simulating, Waiting for wallet signature, Submitting, Confirming).
  - Zaman aÅŸÄ±mÄ±nda veya hatada otomatik 3 kere yeniden deneme (retry) ve gÃ¼venli hata kurtarma (error recovery) mekanizmasÄ±.
- [x] **Live Wallet Account Listener (CanlÄ± CÃ¼zdan Ä°zleyici):**
  - KullanÄ±cÄ± Freighter/Albedo'da hesap deÄŸiÅŸtirdiÄŸinde veya Ã§Ä±kÄ±ÅŸ yaptÄ±ÄŸÄ±nda sayfayÄ± yenilemeden bakiyeyi ve yetkileri anÄ±nda gÃ¼ncelle.
  - Sync butonu (manual refresh fallback) â€” Freighter API baÅŸarÄ±sÄ±z olursa mevcut publicKey ile Ã§alÄ±ÅŸÄ±r
  - Bildirim mesajlarÄ± (Account switched, Wallet disconnected, Wallet synced) 10sn sonra otomatik kaybolur
  - Account switched mesajÄ± refresh'ten Ã¶nce gÃ¶sterilir, refresh arkada devam eder
  - Campaigns list polling: 15sn â†’ 17sn

##### 3. Optimize Onboarding Experience (Kolay Onboarding)
- [ ] **Interactive "Quick Start" Tutorial Sidebar (Rehber Paneli):**
  - SayfanÄ±n saÄŸÄ±nda aÃ§Ä±lÄ±r-kapanÄ±r, ilk gelen kullanÄ±cÄ±nÄ±n cÃ¼zdan aÃ§masÄ±ndan testnet XLM almasÄ±na kadar olan adÄ±mlarÄ± gÃ¶steren gÃ¶rsel kontrol listesi (checklist).
  - CÃ¼zdana tek tÄ±kla Friendbot Ã¼zerinden XLM yÃ¼kleme butonu entegrasyonu.

#### C. Google Form Kurulumu (Ä°yileÅŸtirmeler Bittikten Sonra)
- [ ] Google Form oluÅŸtur (ad, e-posta, cÃ¼zdan adresi, Ã¼rÃ¼n puanÄ± [1-5], en beÄŸenilen Ã¶zellik, geliÅŸtirilmesi gereken yÃ¶n)
- [ ] Excel/CSV yanÄ±t ÅŸablonunu hazÄ±rla (`docs/user_onboarding_responses.csv`)

#### D. KullanÄ±cÄ± BÃ¼yÃ¼tme (50+ Testnet KullanÄ±cÄ±sÄ±)
- [ ] 50+ kullanÄ±cÄ±yÄ± sisteme dahil et ve on-chain iÅŸlemleri gerÃ§ekleÅŸtir
- [ ] 50+ test cÃ¼zdanÄ± oluÅŸtur + Friendbot ile otomatik fonla
- [ ] Her kullanÄ±cÄ± iÃ§in on-chain iÅŸlemler gerÃ§ekleÅŸtir (donate, vote, feedback)
- [ ] Stellar Expert Ã¼zerinden unique cÃ¼zdan iÅŸlem kanÄ±tÄ± screenshot'larÄ±nÄ± al
- [ ] Google Form yanÄ±tlarÄ±nÄ± (Excel) 50 iÅŸlem sonucuna gÃ¶re topla ve dÄ±ÅŸa aktar ve repo'ya ekle
- [ ] README'de Excel linki ve kullanÄ±cÄ± listesini gÃ¶ster

#### E. Pitch Deck
- [ ] Ä°ngilizce tam sunum metnini (slayt slayt) hazÄ±rla
- [ ] Canva sunumu oluÅŸtur (Problem â†’ Ã‡Ã¶zÃ¼m â†’ Pazar â†’ Mimari â†’ BÃ¼yÃ¼me â†’ Yol HaritasÄ±)
- [ ] PDF export al ve README'ye ekle

#### F. Demo Video
- [ ] Video Ã§ekim senaryosunu (walkthrough script) hazÄ±rla
- [ ] Full product walkthrough Ã§ek (5-10 dk), yeni eklenen tÃ¼m Ã¶zellikleri ve 50 kullanÄ±cÄ± hareketliliÄŸini vurgula
- [ ] YouTube'a yÃ¼kle ve README'ye link ekle

#### G. Son DokÃ¼mantasyon
- [ ] README gÃ¼ncelle (Ä°yileÅŸtirmeleri commit linkleriyle ekle, Excel linki, video linki, pitch deck linki)
- [ ] `docs/USER_FEEDBACK.md` gÃ¼ncelle (50 kullanÄ±cÄ± feedback'i ve analizleri ile)
- [ ] README'de toplanan yeni feedback'lere dayanarak **Level 6 Yol HaritasÄ±nÄ±** ("Next Phase Plan") yayÄ±nla

---

## Uygulama SÄ±ralamasÄ± (Yeni ve DoÄŸru AkÄ±ÅŸ)

```
[AdÄ±m 1: UX/UI, Stability & Onboarding Kod GeliÅŸtirmeleri]
                               â”‚
                               â–¼
[AdÄ±m 2: Google Form & Excel Åablonu HazÄ±rlanmasÄ±]
                               â”‚
                               â–¼
[AdÄ±m 3: 50 KullanÄ±cÄ± KullanÄ±cÄ± Edinme & Form Veri Toplama]
                               â”‚
                               â–¼
[AdÄ±m 4: Pitch Deck Sunumu & Walkthrough Demo Videosu]
                               â”‚
                               â–¼
[AdÄ±m 5: README, USER_FEEDBACK, Commit Linkleri & Teslimat]
```

---

## Level 6 â€” Black Belt (Beklemede)

### Program Gereksinimleri (RiseIn)
- [ ] Twitter profili oluÅŸturma + proje ile ilgili dÃ¼zenli paylaÅŸÄ±mlar
- [ ] 30+ yeni kullanÄ±cÄ± onboard etme
- [ ] Stellar Mainnet geÃ§iÅŸi
- [ ] 20+ gerÃ§ek mainnet kullanÄ±cÄ±sÄ±
- [ ] Security review / audit

### Idea Submission Teknik PlanÄ±
- [ ] Blend Protocol entegrasyonu (boÅŸ kampanya fonlarÄ±ndan yield)
- [ ] Flash loan korumasÄ± + withdrawal queue yÃ¶netimi
- [ ] Decentralized verifier staking + slashing mekanizmasÄ±
- [ ] Reputasyon sistemi (doÄŸruluk ve katÄ±lÄ±m bazlÄ±)
- [ ] NFT metadata upgradeability (dinamik reward iÃ§eriÄŸi)

---

## Level 7 â€” Master Belt (Beklemede)

### Idea Submission Teknik PlanÄ±
- [ ] DAO contract: proposal oluÅŸturma, oylama, timelock execution
- [ ] On-chain dispute resolution + arbitration panel
- [ ] Sybil resistance (stake-weighted voting)
- [ ] ÃœÃ§Ã¼ncÃ¼ taraf gÃ¼venlik auditi
- [ ] React Native mobil uygulama
- [ ] Stellar Ecosystem listing baÅŸvurusu

---

## Teknik Notlar

| # | Not |
|---|---|
| 1 | Error(Contract, #10) fix: `donate()` ve `claim_refund()` XLM transferi yapacak ÅŸekilde dÃ¼zeltildi |
| 2 | Token address `DataKey::TokenAddress` olarak storage'da tutuluyor (test ortamÄ± custom SAC kullanabilir) |
| 3 | Single donor tek baÅŸÄ±na fund release yapamaz: quorum = min 2 donor + %66 supermajority |
| 4 | Soulbound NFT'ler `transfer_from` Ã§aÄŸrÄ±ldÄ±ÄŸÄ±nda panic fÄ±rlatarak transferi engeller |
| 5 | TÃ¼m feedback on-chain Soroban event olarak saklanÄ±r, immutable ve herkese aÃ§Ä±ktÄ±r |
