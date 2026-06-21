import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Lumen & Oud — Our House Story" },
      { name: "description", content: "How Lumen & Oud came to be: a small boutique sourcing niche fragrances, mechanical watches, and handcrafted Islamic topis from master artisans." },
      { property: "og:title", content: "About Lumen & Oud" },
      { property: "og:description", content: "A small house of three quiet obsessions." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: () => (
    <div className="container-prose py-16 max-w-3xl fade-in">
      <p className="eyebrow">Our story</p>
      <h1 className="font-display text-5xl mt-2">Three quiet obsessions, one small house</h1>
      <div className="mt-8 prose-editorial">
        <p>Lumen & Oud began in 2018 above a perfumer's atelier in Dubai. Three friends — a chemist, a watchmaker, and a textile collector — couldn't find a single boutique that took all three of their obsessions seriously, so they built one.</p>
        <h2>What we sell</h2>
        <p>Niche extraits and attars, individually serviced mechanical watches, and prayer caps from master artisans in Samarqand, Madinah, and Anatolia. Each piece is hand-selected and, in the case of watches, bench-tested before it ships.</p>
        <h2>How we work</h2>
        <p>We don't carry mass-market lines. Every product on the site has been worn, wound, or worked with by someone on the team. If a perfume's longevity disappoints us, we don't list it. If a watch's regulation drifts, we send it back.</p>
        <h2>Where to find us</h2>
        <p>Our atelier is in the Souk Al Bahar in Dubai. Visits by appointment — <Link to="/contact" className="text-primary">drop us a line</Link>.</p>
      </div>
    </div>
  ),
});