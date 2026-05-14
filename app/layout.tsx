import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import "./globals.css";

const BASE = "https://techinrent.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "TechInRent | LinkedIn Growth & B2B Lead Generation Services",
    template: "%s | TechInRent",
  },
  description:
    "TechInRent provides done-for-you LinkedIn outreach, B2B lead generation, account recovery, and hiring support. 500+ clients served. Policy-safe. Fast 48h setup.",
  keywords: [
    "LinkedIn growth service",
    "B2B lead generation",
    "LinkedIn account management",
    "LinkedIn outreach",
    "LinkedIn account recovery",
    "LinkedIn hiring support",
    "LinkedIn connections",
    "done-for-you LinkedIn",
  ],
  authors: [{ name: "TechInRent", url: BASE }],
  creator: "TechInRent",
  publisher: "TechInRent",
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE,
    siteName: "TechInRent",
    title: "TechInRent | LinkedIn Growth & B2B Lead Generation Services",
    description:
      "Done-for-you LinkedIn outreach, B2B lead generation, account recovery, and hiring support. 500+ clients. Policy-safe execution.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TechInRent — LinkedIn Growth Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@techinrent",
    creator: "@techinrent",
    title: "TechInRent | LinkedIn Growth & B2B Lead Generation Services",
    description:
      "Done-for-you LinkedIn outreach, B2B lead generation, account recovery, and hiring support.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TechInRent",
  url: BASE,
  logo: `${BASE}/techinrent-logo.png.png`,
  description:
    "TechInRent provides done-for-you LinkedIn outreach, B2B lead generation, account recovery, and hiring support.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-78987-11748",
    contactType: "customer service",
    availableLanguage: "English",
  },
  sameAs: [
    "https://twitter.com/techinrent",
    "https://instagram.com/techinrent",
    "https://t.me/techinrentadmin",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TechInRent",
  url: BASE,
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
