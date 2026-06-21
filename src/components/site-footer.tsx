import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24 bg-background">
      <div className="container-prose py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl">
            <span>Lumen</span>
            <span className="text-primary"> & </span>
            <span>Oud</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 max-w-xs">
            A curated boutique of fine fragrances, mechanical watches, and handcrafted Islamic topis.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Shop</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/category/$slug" params={{ slug: "perfumes" }} className="text-muted-foreground hover:text-primary">Perfumes</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "watches" }} className="text-muted-foreground hover:text-primary">Watches</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "topis" }} className="text-muted-foreground hover:text-primary">Topis</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Discover</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/blog" className="text-muted-foreground hover:text-primary">Buying guides</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-primary">Our story</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Visit the boutique</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Account</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/auth" className="text-muted-foreground hover:text-primary">Sign in</Link></li>
            <li><Link to="/account" className="text-muted-foreground hover:text-primary">My account</Link></li>
          </ul>
        </div>
      </div>
      <div className="hairline">
        <div className="container-prose py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Lumen & Oud Ltd. All rights reserved.</p>
          <p>Dubai · London · Istanbul</p>
        </div>
      </div>
    </footer>
  );
}