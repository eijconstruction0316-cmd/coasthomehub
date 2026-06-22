import type { MagazineArticle, MagazineFaq } from "./magazineCms";
import type { LocalSeoLandingPage } from "./localSeo";

const BASE_URL = "https://coasthomehub.com.au";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildArticleSchema(article: MagazineArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seo.description,
    image: [absoluteUrl(article.heroImage)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: article.author,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "CoastHomeHub",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/magazine/${article.slug}`,
    },
    articleSection: article.type,
    keywords: article.tags.join(", "),
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqSchema(faq: MagazineFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildLocalServiceSchema(page: LocalSeoLandingPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    serviceType: page.service.name,
    areaServed: {
      "@type": "City",
      name: page.city.name,
      addressRegion: page.city.region,
      addressCountry: "AU",
    },
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "CoastHomeHub",
      url: BASE_URL,
      areaServed: page.city.name,
    },
    url: absoluteUrl(page.path),
    offers: {
      "@type": "Offer",
      priceCurrency: "AUD",
      description: page.service.costRange,
      availability: "https://schema.org/InStock",
    },
  };
}
