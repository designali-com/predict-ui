import { Inter } from "next/font/google"
import type { Metadata } from "next"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/src/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://predict.fit"

export const metadata: Metadata = {
  title: { default: "PREDICT", template: "%s | PREDICT" },
  description:
    "PREDICT uses advanced biomarkers and personalised health insights to help you understand your biological age, muscle health, and long-term health risks.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "PREDICT",
    title: "PREDICT · Understand your biology",
    description:
      "Discover what your biomarkers reveal about your biological age, muscle health, and long-term health.",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "PREDICT" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PREDICT · Understand your biology",
    images: ["/opengraph-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={cn("antialiased font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
