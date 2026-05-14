import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://techinrent.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/order-summary"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
