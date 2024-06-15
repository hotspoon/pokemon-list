import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import "./globals.css"

const notoSans = Noto_Sans({
  weight: ["100", "200", "300", "400", "500", "700", "900"],
  style: "normal",
  display: "swap",

  fallback: ["Arial", "sans-serif"],

  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Pokemon List",
  description: "Pokemon List"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={notoSans.className}>{children}</body>
    </html>
  )
}
