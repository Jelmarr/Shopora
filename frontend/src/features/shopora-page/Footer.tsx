import ShoporaLogo from "@/components/ShoporaLogo";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface FooterLink {
  name: string;
  href: string;
  isExternal?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  icon: IconType;
  href: string;
}

const FOOTER_NAV: FooterColumn[] = [
  {
    title: "Pages",
    links: [
      { name: "Products", href: "/products" },
      { name: "Features", href: "/features" },
      { name: "Integrations", href: "/integrations" },
      { name: "Pricing", href: "/pricing" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Socials",
    links: [
      { name: "Twitter", href: "https://twitter.com", isExternal: true },
      { name: "LinkedIn", href: "https://linkedin.com", isExternal: true },
      { name: "GitHub", href: "https://github.com", isExternal: true },
      { name: "Discord", href: "https://discord.com", isExternal: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
  {
    title: "Register",
    links: [
      { name: "Get Started", href: "/register" },
      { name: "Login", href: "/login" },
      { name: "Documentation", href: "/docs" },
    ],
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  { name: "Facebook", icon: FaFacebookF, href: "https://facebook.com" },
  { name: "X", icon: FaXTwitter, href: "https://x.com" },
  { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
];

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden border-t border-neutral-200 bg-white py-20 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
      {/* Background Outline Text (Placed Behind Content) */}
      <p className="pointer-events-none absolute inset-x-0 -bottom-10 md:-bottom-20 z-0 select-none text-center font-bold leading-none text-transparent text-[clamp(5rem,20vw,24rem)] tracking-[-0.04em]">
        <span className="[-webkit-text-stroke:1px_#e5e5e5] dark:hidden">
          Shopora
        </span>
        <span className="hidden [-webkit-text-stroke:1px_#404040] dark:inline">
          Shopora
        </span>
      </p>

      {/* Content Layer (Forced Above Background with z-10) */}
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 px-6 pb-20 xl:pb-60 lg:pb-40 md:flex-row">
        {/* Left Section */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-2">
            <ShoporaLogo className="h-8 w-auto text-black dark:text-white transition-colors duration-200" />
            <span className="text-base font-bold text-neutral-900 dark:text-white">
              Shopora
            </span>
          </Link>

          <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                  aria-label={social.name}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          <p className="text-sm text-neutral-400 dark:text-neutral-500">
            © copyright Shopora 2026. All rights reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:gap-16">
          {FOOTER_NAV.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm text-neutral-500 dark:text-neutral-400">
                {column.links.map((link) => (
                  <li key={link.name}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
