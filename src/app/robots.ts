import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/tradies/register/success"],
    },
    sitemap: "https://coasthomehub.com.au/sitemap.xml",
  };
}
