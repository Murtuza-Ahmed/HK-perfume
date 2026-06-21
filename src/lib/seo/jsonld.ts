// Helpers for JSON-LD structured data emitted via head().scripts

export const ld = (obj: unknown) => ({
  type: "application/ld+json" as const,
  children: JSON.stringify(obj),
});

export const organizationLd = (b: { name: string; url?: string; logo?: string; email?: string; phone?: string; social?: Record<string, string> }) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: b.name,
  url: b.url ?? "/",
  logo: b.logo,
  email: b.email,
  telephone: b.phone,
  sameAs: b.social ? Object.values(b.social) : undefined,
});

export const websiteLd = (b: { name: string }) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: b.name,
  url: "/",
  potentialAction: {
    "@type": "SearchAction",
    target: "/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: it.path,
  })),
});

export const productLd = (p: {
  name: string; description: string; image: string; sku: string; brand?: string;
  price: number; currency: string; availability: "InStock" | "OutOfStock";
  url: string; ratingAvg: number; ratingCount: number;
  reviews?: { author: string; rating: number; title?: string; body?: string; date: string }[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  description: p.description,
  image: p.image,
  sku: p.sku,
  brand: p.brand ? { "@type": "Brand", name: p.brand } : undefined,
  offers: {
    "@type": "Offer",
    priceCurrency: p.currency,
    price: p.price.toFixed(2),
    availability: `https://schema.org/${p.availability}`,
    url: p.url,
  },
  aggregateRating: p.ratingCount > 0 ? {
    "@type": "AggregateRating",
    ratingValue: p.ratingAvg,
    reviewCount: p.ratingCount,
  } : undefined,
  review: p.reviews?.map(r => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    name: r.title,
    reviewBody: r.body,
    datePublished: r.date,
  })),
});

export const articleLd = (a: { headline: string; description: string; image?: string; author: string; datePublished: string; url: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.headline,
  description: a.description,
  image: a.image,
  author: { "@type": "Organization", name: a.author },
  datePublished: a.datePublished,
  mainEntityOfPage: a.url,
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const itemListLd = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    url: it.url,
  })),
});

export const localBusinessLd = (b: {
  name: string; description?: string; phone?: string; email?: string;
  street?: string; city?: string; region?: string; postalCode?: string; country?: string;
  lat?: number; lng?: number; hours?: { day: string; hours: string }[];
}) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: b.name,
  description: b.description,
  telephone: b.phone,
  email: b.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: b.street,
    addressLocality: b.city,
    addressRegion: b.region,
    postalCode: b.postalCode,
    addressCountry: b.country,
  },
  geo: b.lat && b.lng ? { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng } : undefined,
  openingHours: b.hours?.map(h => `${h.day} ${h.hours}`),
});