import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "@/components/Providers"
import OnboardingChecklist from "@/components/OnboardingChecklist"
import LayoutShell from "@/components/LayoutShell"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ReviveForge - Marketplace for Abandoned Digital Projects",
  description:
    "AI-powered marketplace connecting entrepreneurs with undervalued SaaS projects, MVPs, and digital assets",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bkg text-fg min-h-screen`}>
        <Providers>
          <LayoutShell>
            {children}
            <OnboardingChecklist />
          </LayoutShell>
        </Providers>
      </body>
    </html>
  )
}
