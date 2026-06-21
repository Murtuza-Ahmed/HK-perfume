import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={12} className="opacity-60" />}
              {isLast ? (
                <span className="text-foreground">{it.name}</span>
              ) : (
                <Link to={it.path} className="hover:text-primary">{it.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}