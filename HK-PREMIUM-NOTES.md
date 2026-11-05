# HK-perfume — Pure Tailwind + Premium UI/UX + CI/CD (2026-11-05)

## Apply karne ka tariqa
1. Is zip ko repo root me **Extract Here → Yes to All**.
2. `DELETE_THESE.txt` wali cheezein repo se **delete** kar do:
   `src/components/ui/` (poora folder), `src/lib/utils.ts`, `components.json`.
3. `npm install` chalao (40 bekaar dependencies nikli hain).
4. Commit + push → Vercel auto-redeploy + GitHub Actions CI khud chalega.

## 1. Mukammal Tailwind — shadcn khatam
- Poora `src/components/ui/` folder delete (10 files — app me **koi bhi**
  istemal nahi ho raha tha, ye sirf dead wazan tha).
- `src/lib/utils.ts` (cn helper) + `components.json` delete.
- **package.json se 40 dependencies nikaliं**: tamam `@radix-ui/*` (26),
  `class-variance-authority`, `clsx`, `tailwind-merge`, `cmdk`, `vaul`,
  `embla-carousel-react`, `input-otp`, `react-resizable-panels`,
  `react-day-picker`, `recharts`, `react-hook-form`, `@hookform/resolvers`,
  `date-fns`, `sonner`. Sirf 16 asli dependencies baqi.
- **Naya Tailwind-native toast** (`src/components/toast.tsx`): sonner ki
  jagah khud ka halka system — `toast.success()` / `toast.error()` API
  same hai, koi library nahi, premium dark-gold styling.

## 2. Premium UI/UX
- **Buttons**: gold gradient + glow shadow, hover par lift, active/focus/
  disabled states — `.btn-gold`, `.btn-outline` dono upgrade.
- **Cards**: subtle gradient + shadow; product card par hover me gold
  border glow + zyada lift.
- **Naye `.input-lux` inputs**: tamam forms (login/signup, search, admin SEO)
  me premium focus ring ke sath.
- **Header nav**: gold underline jo hover par animate hota hai.
- **Global**: gold focus rings, luxury scrollbar, toast slide-in animation.

## 3. GitHub CI/CD (`.github/workflows/ci.yml`)
Har push/PR par `main` branch me:
1. `npm ci` → 2. `tsc --noEmit` → 3. `eslint src/` → 4. `npm run build`
CD: Vercel apne GitHub integration se har push par khud deploy karta hai.

## 4. Pehle wale fixes (barqarar hain)
- `.vercelignore` se `.env` hata diya — "This page didn't load" wale
  error ki asal wajah (Vercel build me VITE_ vars undefined thay).
- Sitemap `BASE_URL` = `https://hk-perfume.vercel.app`.
- Tamam og:/canonical/JSON-LD URLs absolute (`src/lib/seo/site.ts`).

## Verify ho chuka
- `npm ci` (lock file ke sath): OK — TanStack versions wahi pinned hain
  jo pehle kaam kar rahe thay (react-start 1.168.26).
- `tsc --noEmit`: 0 errors · `eslint src/`: 0 errors · `npm run build`: OK
- Client bundle me Supabase URL maujood, zero radix code.

## Tumhare zimme (Supabase)
Homepage sections ab bhi khaali ayenge jab tak Supabase theek na ho:
Dashboard me project paused to nahi? Tables me data hai? `anon` ke liye
SELECT policy hai?
