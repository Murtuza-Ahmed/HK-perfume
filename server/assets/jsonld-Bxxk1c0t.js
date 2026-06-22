//#region src/lib/seo/jsonld.ts
var ld = (obj) => ({
	type: "application/ld+json",
	children: JSON.stringify(obj)
});
var organizationLd = (b) => ({
	"@context": "https://schema.org",
	"@type": "Organization",
	name: b.name,
	url: b.url ?? "/",
	logo: b.logo,
	email: b.email,
	telephone: b.phone,
	sameAs: b.social ? Object.values(b.social) : void 0
});
var websiteLd = (b) => ({
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: b.name,
	url: "/",
	potentialAction: {
		"@type": "SearchAction",
		target: "/search?q={search_term_string}",
		"query-input": "required name=search_term_string"
	}
});
var breadcrumbLd = (items) => ({
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: items.map((it, i) => ({
		"@type": "ListItem",
		position: i + 1,
		name: it.name,
		item: it.path
	}))
});
var productLd = (p) => ({
	"@context": "https://schema.org",
	"@type": "Product",
	name: p.name,
	description: p.description,
	image: p.image,
	sku: p.sku,
	brand: p.brand ? {
		"@type": "Brand",
		name: p.brand
	} : void 0,
	offers: {
		"@type": "Offer",
		priceCurrency: p.currency,
		price: p.price.toFixed(2),
		availability: `https://schema.org/${p.availability}`,
		url: p.url
	},
	aggregateRating: p.ratingCount > 0 ? {
		"@type": "AggregateRating",
		ratingValue: p.ratingAvg,
		reviewCount: p.ratingCount
	} : void 0,
	review: p.reviews?.map((r) => ({
		"@type": "Review",
		author: {
			"@type": "Person",
			name: r.author
		},
		reviewRating: {
			"@type": "Rating",
			ratingValue: r.rating,
			bestRating: 5
		},
		name: r.title,
		reviewBody: r.body,
		datePublished: r.date
	}))
});
var articleLd = (a) => ({
	"@context": "https://schema.org",
	"@type": "Article",
	headline: a.headline,
	description: a.description,
	image: a.image,
	author: {
		"@type": "Organization",
		name: a.author
	},
	datePublished: a.datePublished,
	mainEntityOfPage: a.url
});
var faqLd = (faqs) => ({
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs.map((f) => ({
		"@type": "Question",
		name: f.q,
		acceptedAnswer: {
			"@type": "Answer",
			text: f.a
		}
	}))
});
var itemListLd = (items) => ({
	"@context": "https://schema.org",
	"@type": "ItemList",
	itemListElement: items.map((it, i) => ({
		"@type": "ListItem",
		position: i + 1,
		name: it.name,
		url: it.url
	}))
});
var localBusinessLd = (b) => ({
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
		addressCountry: b.country
	},
	geo: b.lat && b.lng ? {
		"@type": "GeoCoordinates",
		latitude: b.lat,
		longitude: b.lng
	} : void 0,
	openingHours: b.hours?.map((h) => `${h.day} ${h.hours}`)
});
//#endregion
export { ld as a, productLd as c, itemListLd as i, websiteLd as l, breadcrumbLd as n, localBusinessLd as o, faqLd as r, organizationLd as s, articleLd as t };
