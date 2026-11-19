import type { Metadata } from "next"

import { ScreensGallery } from "@/src/components/screens/screens-gallery"

export const metadata: Metadata = {
  title: "Screens",
  description: "Every app and desktop screen of PREDICT, built with the PREDICT UI kit.",
}

export default function ScreensPage() {
  return <ScreensGallery />
}
