export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  badge?: string;
};

// Primary desktop nav matching exact reference
export const primaryNav: NavItem[] = [
  { label: "Discover", href: "/companies", hasDropdown: true },
  { label: "Alumni", href: "/connect", hasDropdown: true },
  { label: "Stories", href: "/experiences", hasDropdown: true },
  { label: "Resources", href: "/questions", hasDropdown: true },
  { label: "About", href: "/about" },
];

export const mobileNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/companies" },
  { label: "Alumni", href: "/connect" },
  { label: "Stories", href: "/experiences" },
  { label: "Resources", href: "/questions" },
  { label: "About", href: "/about" },
  { label: "Sign In", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];
