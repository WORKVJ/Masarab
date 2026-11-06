import type { Metadata, Viewport } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionRoot from "@/components/motion/MotionRoot";
import ChatContact from "@/components/chat/ChatContact";
import { PRELOADER_HEAD_SCRIPT } from "@/lib/preloader";
import { SITE_URL } from "@/lib/routes";
import { siteJsonLd } from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const SITE_DESCRIPTION =
  "Leading industrial supplier in Saudi Arabia: cooling towers, water treatment, chemicals, electrical, instrumentation, mechanical, pipe fittings & safety gear.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // each page sets its own title → "About Us | Masar Arabia" etc.
  title: {
    default: "Masar Arabia | Leading Supplier of Industrial Solutions in Saudi Arabia",
    template: "%s | Masar Arabia",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "industrial supplier Saudi Arabia",
    "Masar Arabia First Trading Company",
    "FRP gratings Saudi Arabia",
    "cooling towers Saudi Arabia",
    "FRP fan manufacturers Saudi Arabia",
    "water treatment company Saudi Arabia",
    "EDI EDR membrane degassing",
    "chemical suppliers Saudi Arabia",
    "safety equipment suppliers Saudi Arabia",
    "instrumentation supplier Jeddah",
    "pipe fittings and alloys Jeddah",
  ],
  authors: [{ name: "Masar Arabia First Trading Company" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Masar Arabia",
    title: "Masar Arabia | Leading Supplier of Industrial Solutions in Saudi Arabia",
    description: SITE_DESCRIPTION,
    images: [{ url: "/images/masar/about.webp", width: 1700, height: 1134, alt: "Masar Arabia industrial solutions" }],
    locale: "en_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Masar Arabia | Leading Supplier of Industrial Solutions in Saudi Arabia",
    description: SITE_DESCRIPTION,
    images: ["/images/masar/about.webp"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logo-icon.png', type: 'image/png', sizes: '76x80' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Runs before first paint: skip the branded loader if it was already seen this session */}
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_HEAD_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900">
        <Preloader />
        {/* Structured data so search engines understand the business, location and contact details */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLd(SITE_DESCRIPTION)).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar />
        <main
          id="main"
          className="min-h-screen flex flex-col overflow-x-clip bg-white text-slate-900 selection:bg-[#0d7cae] selection:text-white relative"
        >
          {children}
          <Footer />
        </main>
        <MotionRoot />
        <ChatContact />
      </body>
    </html>
  );
}
