import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechInRent | LinkedIn Growth Services",
  description:
    "TechInRent helps brands and professionals grow LinkedIn reach with secure, fast, and reliable growth services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
