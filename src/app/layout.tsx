import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { MotionProvider } from "@/components/layout/motion-provider";
import Script from "next/script";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Prohabla",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      {process.env.NODE_ENV === "development" && (
        <head>
          {/* Vista previa de temas de tweakcn, solo en desarrollo. */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="https://tweakcn.com/live-preview.min.js" />
        </head>
      )}
      <body className="min-h-full flex flex-col" style={{ background: "#F7FBFE" }}>
        <MotionProvider>
          <Navbar />
          <div id="contenido" className="flex flex-1 flex-col">{children}</div>
        </MotionProvider>
        <Script
          src="https://api-crm.goxt.io/api/widget/embed.js"
          data-api-key="wk_f8c21837b9b4027d0e1f4e32d87eb2f670dc4ddd2550e7f1"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
