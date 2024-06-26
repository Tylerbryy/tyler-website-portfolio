import "@/styles/tailwind.css";
import { MainWrapper, ThemeProvider, TwIndicator } from "@/components/main";
import metaData from "@/config/meta";
import { cn, constructOgImageUri, getUrl } from "@/lib/utils";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

interface RootLayoutProps {
  children: React.ReactNode;
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const calSans = localFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-calsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: metaData.title,
    template: "%s | Portfolio",
  },
  generator: metaData.author.name,
  applicationName: metaData.title,
  description: metaData.description,
  referrer: "origin-when-cross-origin",
  keywords: [
    "Tyler",
    "Oklahoma",
    "Software Engineer",
    "Blanchard",
    "Typescript",
    "Python",
    "Artificial Intelligence",
    "Next.js",
    "Tailwind",
    "Supabase",
    "React",
    "Shadcn",
  ],
  authors: [
    {
      name: metaData.author.name,
      url: metaData.author.twitterUrl,
    },
  ],
  creator: metaData.author.name,
  publisher: metaData.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getUrl()),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: ["/favicons/favicon-32x32.png"],
    apple: [
      { url: "/favicons/apple-touch-icon.png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon.png",
        url: "apple-touch-icon.png",
      },
    ],
  },

  manifest: `${getUrl()}/favicons/manifest.json`,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: getUrl(),
    title: metaData.title,
    description: metaData.description,
    siteName: metaData.title,
    images: [
      {
        url: constructOgImageUri(metaData.ogTitle, "Home", metaData.tags, "/"),
        width: 1200,
        height: 630,
        alt: metaData.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metaData.ogTitle,
    description: metaData.description,
    images: [constructOgImageUri(metaData.ogTitle, "Home", metaData.tags, "/")],
    creator: metaData.author.twitterAddress,
  },
  appleWebApp: {
    capable: true,
    title: metaData.title,
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="layout" suppressHydrationWarning>
      <body
        className={cn(
          "layout h-full scroll-smooth",
          fontSans.variable,
          calSans.variable,
        )}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainWrapper>
            {children}
            <Toaster position="top-center" />
            <VercelAnalytics />
            <TwIndicator />
          </MainWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
