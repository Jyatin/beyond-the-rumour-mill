import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CommandPalette } from "@/components/layout/command-palette";
import { getCompanies } from "@/server/queries/companies";
import { getPublishedExperiences } from "@/server/queries/experiences";
import { getInterviewQuestions } from "@/server/queries/interview-questions";
import { getCurrentUser } from "@/server/auth-helpers";
import { getMyNotifications, getUnreadNotificationCount } from "@/server/queries/notifications";
// Self-hosted via @fontsource — bundled woff2 files locally.
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/500.css";
import "@fontsource/newsreader/600.css";
import "@fontsource/newsreader/400-italic.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource-variable/inter-tight/wght.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import { PageTransition } from "@/components/providers/page-transition";

export const metadata = {
  title: {
    default: "Beyond the Rumour Mill",
    template: "%s · Beyond the Rumour Mill",
  },
  description:
    "Verified placement experiences, interview patterns, and preparation intelligence built from real students who got there.",
};

export default async function RootLayout({ children }) {
  const [companiesList, experiencesList, questionsList, user] = await Promise.all([
    getCompanies().catch(() => []),
    getPublishedExperiences().catch(() => []),
    getInterviewQuestions().catch(() => []),
    getCurrentUser().catch(() => null),
  ]);

  let notifications = [];
  let unreadCount = 0;
  if (user) {
    [notifications, unreadCount] = await Promise.all([
      getMyNotifications(10).catch(() => []),
      getUnreadNotificationCount().catch(() => 0),
    ]);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="relative flex min-h-svh flex-col">
            <SiteNav user={user} notifications={notifications} unreadCount={unreadCount} />
            <main className="flex-1 pb-16 md:pb-0">
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter />
            <MobileNav />
          </div>
          <CommandPalette companies={companiesList} experiences={experiencesList} questions={questionsList} />
        </ThemeProvider>
      </body>
    </html>
  );
}
