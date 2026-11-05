import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

export type ProductSummary = {
  slug: string;
  name: string;
  brand?: string | null;
  short_description?: string | null;
  price: number | string;
  currency: string;
  images: string[];
  rating_avg?: number | string;
  rating_count?: number;
};

const fmt = (price: number | string, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(
    Number(price),
  );

export function ProductCard({ product }: { product: ProductSummary }) {
  const img = product.images?.[0] ?? "/images/cat-perfumes.webp";
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block card-surface overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_20px_40px_-16px_oklch(0.78_0.12_80/0.25)]"
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        {product.brand && <p className="eyebrow mb-1">{product.brand}</p>}
        <h3 className="font-display text-lg leading-tight">{product.name}</h3>
        {product.short_description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.short_description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-foreground font-medium">
            {fmt(product.price, product.currency)}
          </span>
          {product.rating_count ? (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star size={12} className="fill-primary text-primary" />
              {Number(product.rating_avg).toFixed(1)} ({product.rating_count})
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
