import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search, User } from "lucide-react";

const NAV = [
  { to: "/category/$slug", params: { slug: "perfumes" }, label: "Perfumes" },
  { to: "/category/$slug", params: { slug: "watches" }, label: "Watches" },
  { to: "/category/$slug", params: { slug: "topis" }, label: "Topis" },
  { to: "/blog", label: "Guides" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${scrolled ? "bg-background/85 backdrop-blur border-b border-border" : "bg-transparent"}`}
    >
      <div className="container-prose flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-display text-2xl tracking-tight">
          <span className="text-foreground">Lumen</span>
          <span className="text-primary"> & </span>
          <span className="text-foreground">Oud</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to as never}
              params={(n as { params?: object }).params as never}
              className="nav-link text-sm text-muted-foreground hover:text-primary transition-colors"
              activeProps={{ className: "nav-link text-primary text-sm" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/search"
            aria-label="Search"
            className="p-2 text-muted-foreground hover:text-primary"
          >
            <Search size={18} />
          </Link>
          <Link
            to="/account"
            aria-label="Account"
            className="p-2 text-muted-foreground hover:text-primary"
          >
            <User size={18} />
          </Link>
        </div>
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-prose flex flex-col py-4 gap-3">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to as never}
                params={(n as { params?: object }).params as never}
                onClick={() => setOpen(false)}
                className="text-base text-foreground py-1"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-2 border-t border-border">
              <Link
                to="/search"
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground"
              >
                Search
              </Link>
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground"
              >
                Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
