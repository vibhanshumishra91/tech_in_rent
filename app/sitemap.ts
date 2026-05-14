import type { MetadataRoute } from "next";

const BASE = "https://techinrent.com";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE,                              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
  { url: `${BASE}/about`,                   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/account-management`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE}/account-recovery`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE}/lead-generation`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE}/hiring-support`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE}/linkedin-services`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/sales-partnership`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/followers-checkout`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/blog`,                    lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
  { url: `${BASE}/faq`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/contact`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/demo`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/privacy-policy`,          lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  { url: `${BASE}/terms`,                   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  { url: `${BASE}/refund-policy`,           lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  { url: `${BASE}/service-agreement`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
];

interface BlogPost {
  slug: string;
  updatedAt: string;
  status: string;
}

async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${BASE}/api/admin/blogs`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const posts: BlogPost[] = (data.data || []).filter(
      (p: BlogPost) => p.status === "published"
    );
    return posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogEntries = await getBlogSitemapEntries();
  return [...staticRoutes, ...blogEntries];
}
