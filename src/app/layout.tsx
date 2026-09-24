import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CommandPalette } from "@/components/layout/command-palette";
// Self-hosted via @fontsource — the sandbox this was built in can't reach
// fonts.googleapis.com, so next/font/google's remote fetch fails at build.
// These npm packages bundle the same woff2 files locally instead.
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/inter-tight/wght.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";

import { PageTransition } from "@/components/providers/page-transition";

export const metadata: Metadata = {
  title: {
    default: "Beyond the Rumour Mill",
    template: "%s · Beyond the Rumour Mill",
  },
  description:
    "Verified placement experiences, interview patterns, and preparation intelligence built from real students who got there.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-svh flex-col">
            <SiteNav />
            <main className="flex-1 pb-16 md:pb-0">
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter />
            <MobileNav />
          </div>
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
