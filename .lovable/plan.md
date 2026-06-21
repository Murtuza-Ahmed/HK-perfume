
# Lumen & Oud — Multi-Category Luxury Storefront with SEO Foundation

A multi-category e-commerce site for perfumes, luxury watches, and Islamic topis, with a complete SEO architecture wired in from day one. Built on TanStack Start + Lovable Cloud (database, auth, storage).

## Design direction

Since you didn't specify, I'll go with a direction that fits all three verticals:

- **Mood**: luxury, warm, editorial — between a perfume house and a fine-watch boutique
- **Palette** (oklch tokens): deep midnight `oklch(0.18 0.02 270)` background, warm ivory `oklch(0.97 0.01 85)` text, antique gold `oklch(0.78 0.12 80)` primary, muted oud `oklch(0.45 0.06 30)` accent
- **Typography**: Cormorant Garamond (display, headings) + Inter (body), via @fontsource
- **Imagery**: generated hero images per category (bottle on velvet, watch macro, embroidered topi flat-lay)
- **Motion**: subtle fade/slide on scroll, no flashy effects

If you want a different aesthetic (e.g. Arabic-inspired with calligraphy accents, ultra-minimal Apple-style, or color-rich bazaar feel), say the word before I start and I'll adjust the tokens.

## What ships in this build

### Storefront pages (all SSR, all with per-route head metadata)
- `/` — home (hero, category tiles, featured products, latest guides)
- `/category/$slug` — category landing (perfumes / watches / topis) with product grid + filters
- `/product/$slug` — product detail (gallery, description, price, rating, reviews, related)
- `/blog` — guides index
- `/blog/$slug` — article with related-articles section
- `/about`, `/contact` (with map embed + LocalBusiness schema), `/search`
- `/auth` (email/password + Google) and `/_authenticated/account` (orders, profile)

### SEO infrastructure
- **Per-route head()**: dynamic title, description, keywords, canonical, og:*, twitter:*, og:url self-referencing each route
- **Structured data (JSON-LD)** wired via small helpers in `src/lib/seo/`:
  - Organization + WebSite (root)
  - Product + Offer + AggregateRating + Review (product pages)
  - BreadcrumbList (category, product, blog routes)
  - Article (blog posts)
  - FAQPage (product FAQ blocks + dedicated FAQ on guides)
  - LocalBusiness (contact page)
- **Sitemap**: `src/routes/sitemap[.]xml.ts` server route, enumerates static routes + every product + every blog post from the DB
- **robots.txt**: `public/robots.txt` allowing all, disallowing `/account`, `/auth`
- **Breadcrumbs UI** with matching schema on every deep page
- **Internal linking**: category → product → related products → related guides
- **SEO-friendly URLs**: slugs everywhere (no IDs in URLs)

### Performance
- Code splitting is automatic via TanStack Start; routes are split per file
- `imagetools` for build-time WebP/AVIF variants of bundled hero images
- Lazy-loaded `<img loading="lazy" decoding="async">` on grids; LCP image preloaded per route via `head().links`
- Generated images served as WebP
- No heavy client libs; query data via TanStack Query + `ensureQueryData` in loaders

### E-commerce SEO specifics
- Product pages emit Product + Offer (price, availability, currency) + AggregateRating + Review JSON-LD
- Category pages emit ItemList JSON-LD
- Out-of-stock products keep their URL with `availability: OutOfStock` rather than 404

### Admin SEO dashboard (`/_authenticated/admin/seo`, admin-role gated)
- Meta management: edit title/description/keywords per product, category, post, or static page (stored in `seo_meta` table, falls back to defaults)
- Redirects: `seo_redirects` table + a small server route that 301s
- Robots.txt + sitemap status view (read-only summary)
- Schema preview per entity
- Analytics overview is a placeholder card pointing to GA/Plausible (not building an analytics pipeline here)

### Content
- Seed: 12 products across the three categories, 6 guides (perfume buying guide, watch movements explained, topi styles, etc.), one of each category featured on the home page
- Real copy, not Lorem Ipsum — written to be SEO-useful

## Data model (Lovable Cloud)

```
categories(id, slug, name, description, hero_image, seo_title, seo_description, seo_keywords)
products(id, slug, category_id, name, description, price, currency, stock, images[], rating_avg, rating_count, seo_title, seo_description, seo_keywords, faq jsonb)
reviews(id, product_id, user_id, rating, title, body, created_at)
posts(id, slug, title, excerpt, body_md, cover_image, category_id nullable, published_at, seo_title, seo_description, seo_keywords)
seo_meta(id, entity_type, entity_id, title, description, keywords)  -- override layer
seo_redirects(id, from_path, to_path, status)  -- 301/302
profiles(id -> auth.users, display_name, avatar_url)
user_roles(user_id, role)  -- 'admin' | 'user', enforced via has_role() SECURITY DEFINER
business_info(id, name, address, phone, email, lat, lng, hours jsonb)  -- single row for LocalBusiness schema + contact page
```

All tables get explicit GRANTs + RLS:
- public SELECT on categories, products, posts, business_info, reviews
- authenticated INSERT on reviews
- admin-only writes on everything else, gated by `has_role(auth.uid(), 'admin')`

## What I'm explicitly NOT doing in this build

Tell me if any of these matter and I'll add them in a follow-up:

- **Cart / checkout / payments** — listed under "E-commerce SEO" but you said storefront + SEO foundation. Stripe wiring is its own milestone.
- **Real Google Analytics / Search Console integration** — the SEO dashboard shows a placeholder; hook up GA4 when you have an account.
- **Lighthouse 90+ as a verified number** — I'll build to the patterns that get there (SSR, lazy images, WebP, code splitting, preload LCP, minimal client JS), but I won't run Lighthouse against the preview as part of this turn.
- **Real Google Maps API key** — contact page uses an embedded iframe (no API key needed); swap to JS API later if you want interactive markers.
- **Image CDN / on-the-fly resizing** — bundled assets only.
- **Multi-language / hreflang**.

## Technical notes

- Lovable Cloud enabled first (database + auth + storage). Email/password + Google sign-in.
- Roles in a separate `user_roles` table with `has_role()` SECURITY DEFINER — never on profiles.
- Admin dashboard lives under `_authenticated/` and additionally checks the admin role in its loader (via an authenticated server fn).
- Public reads go through a server publishable client + narrow `TO anon` SELECT policies; admin writes via `requireSupabaseAuth` server fns that check `has_role`.
- Loader data flows into `head()` for dynamic meta + JSON-LD on product / category / post routes.
- `BASE_URL` stays empty in sitemap until you set a custom domain — canonicals and og:url use relative paths.
- Images generated for: 3 category heroes, 1 home hero, 12 product shots, 6 guide covers.

## Build order (one response, batched where possible)

1. Enable Lovable Cloud
2. Migration: enums, tables, GRANTs, RLS policies, `has_role()`, profile trigger
3. Seed migration: categories, products, posts, business_info
4. Design tokens in `src/styles.css`, fonts via @fontsource, button/card variants
5. SEO helpers: `src/lib/seo/{meta,jsonld,breadcrumbs}.ts`
6. Server fns: `products.functions.ts`, `posts.functions.ts`, `categories.functions.ts`, `seo.functions.ts` (admin)
7. Routes: root + index + category/$slug + product/$slug + blog + blog/$slug + about + contact + auth + account + admin/seo
8. Sitemap server route, robots.txt
9. Generated images
10. Skim-check build output

Heads up: this is a large build. Expect a long single turn with many file writes. Reply "go" to proceed, or tell me what to drop/swap first.
