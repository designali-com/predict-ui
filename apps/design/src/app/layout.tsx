import type { Metadata } from "next"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/src/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils";
import { fontSans } from "@/src/lib/fonts"

export const metadata: Metadata = {
  title: {
    default: "PREDICT",
    template: `%s | PREDICT`,
  },

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://predict.fit"
  ),

  description:
    "The design system behind PREDICT: components, blocks, and guidelines for clear health interfaces.",

  keywords: [
    "PREDICT",
    "design system",
    "health UI",
    "biological age",
    "muscle age",
    "biomarkers",
    "health assessment",
    "longevity",
    "preventive healthcare",
    "personalised health",
    "metabolic health",
    "muscle health",
  ],

  authors: [
    {
      name: "PREDICT",
      url: "https://predict.fit",
    },
  ],

  creator: "PREDICT",

  openGraph: {
    type: "website",
    locale: "en_GB",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://predict.fit",
    title: "PREDICT design system",
    description:
      "The design system behind PREDICT: components, blocks, and guidelines for clear health interfaces.",
    siteName: "PREDICT",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://predict.fit"}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        alt: "PREDICT",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PREDICT design system",
    description:
      "The design system behind PREDICT: components, blocks, and guidelines for clear health interfaces.",
    images: [
      `${process.env.NEXT_PUBLIC_APP_URL || "https://predict.fit"}/opengraph-image.jpg`,
    ],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased font-sans", fontSans.variable)}
    >
      <body>
        <ThemeProvider>
          <div className="bg-white dark:bg-black">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
