export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/ask", label: "Ask" },
  { href: "/scenarios", label: "Scenarios" },
  { href: "/simulate", label: "Simulate" },
  { href: "/learn", label: "Learn" },
  { href: "/progress", label: "Progress" },
];
