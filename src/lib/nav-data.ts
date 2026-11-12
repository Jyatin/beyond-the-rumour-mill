export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  badge?: string;
};

// Primary desktop nav matching clean minimal IA
export const primaryNav: NavItem[] = [
  { label: "Companies", href: "/companies" },
  { label: "Preparation", href: "/prepare" },
  { label: "Experiences", href: "/experiences" },
  { label: "Questions", href: "/questions" },
  { label: "Alumni", href: "/alumni" },
];

export const mobileNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Companies", href: "/companies" },
  { label: "Preparation", href: "/prepare" },
  { label: "Experiences", href: "/experiences" },
  { label: "Questions", href: "/questions" },
  { label: "Alumni", href: "/alumni" },
  { label: "Sign In", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];
