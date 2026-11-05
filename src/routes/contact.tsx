import { createFileRoute } from "@tanstack/react-router";
import { abs } from "@/lib/seo/site";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getBusinessInfo } from "@/lib/storefront.functions";
import { ld, localBusinessLd, breadcrumbLd } from "@/lib/seo/jsonld";
import { Mail, Phone, MapPin } from "lucide-react";

const qo = queryOptions({ queryKey: ["business"], queryFn: () => getBusinessInfo() });

type Hour = { day: string; hours: string };

export const Route = createFileRoute("/contact")({
  loader: ({ context }) => context.queryClient.ensureQueryData(qo),
  head: ({ loaderData }) => {
    const b = loaderData;
    return {
      meta: [
        { title: `Contact & Visit | ${b?.name ?? "Lumen & Oud"}` },
        {
          name: "description",
          content: `Visit our Dubai boutique or reach our concierge by email and phone. ${b?.description ?? ""}`,
        },
        { property: "og:title", content: `Contact ${b?.name ?? "Lumen & Oud"}` },
        { property: "og:description", content: "Boutique address, hours, and concierge contact." },
        { property: "og:url", content: abs("/contact") },
      ],
      links: [{ rel: "canonical", href: abs("/contact") }],
      scripts: b
        ? [
            ld(
              breadcrumbLd([
                { name: "Home", path: "/" },
                { name: "Contact", path: "/contact" },
              ]),
            ),
            ld(
              localBusinessLd({
                name: b.name,
                description: b.description ?? undefined,
                phone: b.phone ?? undefined,
                email: b.email ?? undefined,
                street: b.street ?? undefined,
                city: b.city ?? undefined,
                region: b.region ?? undefined,
                postalCode: b.postal_code ?? undefined,
                country: b.country ?? undefined,
                lat: b.lat ? Number(b.lat) : undefined,
                lng: b.lng ? Number(b.lng) : undefined,
                hours: (b.hours as unknown as Hour[]) ?? [],
              }),
            ),
          ]
        : [],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const { data: b } = useSuspenseQuery(qo);
  if (!b) return null;
  const hours = (b.hours as unknown as Hour[]) ?? [];
  return (
    <div className="container-prose py-16 fade-in">
      <p className="eyebrow">Visit & concierge</p>
      <h1 className="font-display text-5xl mt-2">Find us</h1>
      <div className="grid gap-12 lg:grid-cols-2 mt-12">
        <div>
          <div className="space-y-5">
            <div className="flex gap-3">
              <MapPin size={18} className="text-primary mt-1" />
              <div>
                <p className="text-foreground font-medium">Atelier</p>
                <p className="text-sm text-muted-foreground">
                  {b.street}
                  <br />
                  {b.city}, {b.region} {b.postal_code}
                  <br />
                  {b.country}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail size={18} className="text-primary mt-1" />
              <a href={`mailto:${b.email}`} className="text-sm hover:text-primary">
                {b.email}
              </a>
            </div>
            <div className="flex gap-3">
              <Phone size={18} className="text-primary mt-1" />
              <a href={`tel:${b.phone}`} className="text-sm hover:text-primary">
                {b.phone}
              </a>
            </div>
          </div>
          <div className="mt-10">
            <p className="eyebrow mb-3">Opening hours</p>
            <dl className="text-sm divide-y divide-border border-y border-border">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between py-2">
                  <dt className="text-muted-foreground">{h.day}</dt>
                  <dd className="text-foreground">{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="card-surface overflow-hidden aspect-[4/3]">
          {b.map_embed_url && (
            <iframe
              src={b.map_embed_url}
              title="Boutique location"
              loading="lazy"
              className="h-full w-full border-0"
            />
          )}
        </div>
      </div>
    </div>
  );
}
