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
import { getSiteContact } from "@/lib/siteSettings";
import { SiteContactProvider } from "@/components/SiteContactProvider";
import SiteShell from "@/components/SiteShell";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // phone, email, address … as edited in the admin panel (built-in values if the backend is unreachable)
  const contact = await getSiteContact();
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Runs before first paint: skip the branded loader if it was already seen this session */}
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_HEAD_SCRIPT }} />
      </head>
      {/* suppressHydrationWarning: browser extensions (Grammarly, password managers, ColorZilla …) add
          attributes to <body> before React hydrates; this ignores only <body>'s own attributes */}
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900" suppressHydrationWarning>
        <SiteContactProvider value={contact}>
          <SiteShell
            before={
              <>
                <Preloader />
                {/* Structured data so search engines understand the business, location and contact details */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(siteJsonLd(SITE_DESCRIPTION, contact)).replace(/</g, "\\u003c"),
                  }}
                />
                <Navbar />
              </>
            }
            footer={<Footer />}
            after={
              <>
                <MotionRoot />
                <ChatContact />
              </>
            }
          >
            {children}
          </SiteShell>
        </SiteContactProvider>
      </body>
    </html>
  );
}
