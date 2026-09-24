export type NavItem = {
  label: string;
  href: string;
  badge?: string;
};

// Primary desktop nav
export const primaryNav: NavItem[] = [
  { label: "Explore", href: "/companies" },
  { label: "Companies", href: "/companies" },
  { label: "Experiences", href: "/experiences" },
  { label: "Questions", href: "/questions" },
  { label: "Connect", href: "/connect", badge: "NEW" },
];

export const mobileNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Connect", href: "/connect" },
  { label: "Explore", href: "/companies" },
  { label: "Sign In", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];
