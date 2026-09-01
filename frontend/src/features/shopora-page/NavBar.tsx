"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  StoreIcon,
  PackageIcon,
  ShoppingCartIcon,
  GlobeIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu";
import ShoporaLogo from "@/src/components/ShoporaLogo";

const mobileFeatures = [
  {
    title: "Storefronts",
    description: "Launch a fully customizable storefront in minutes.",
    icon: StoreIcon,
  },
  {
    title: "Products & Variants",
    description: "Manage inventory across sizes, colors, and more.",
    icon: PackageIcon,
  },
  {
    title: "Cart Recovery",
    description: "Automatically win back abandoned checkouts.",
    icon: ShoppingCartIcon,
  },
  {
    title: "Custom Domains",
    description: "Connect your own domain with SSL included.",
    icon: GlobeIcon,
  },
];

const navLinks = [
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        setScrolled(currentY > 8);

        if (currentY > lastScrollY.current && currentY > 80) {
          setHidden(true); // scrolling down past threshold — hide
          setMobileOpen(false); // don't leave the mobile menu open behind a hidden header
        } else {
          setHidden(false); // scrolling up or near top — show
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ease-out max-w-7xl mx-auto my-0 ${
        scrolled || mobileOpen
          ? "mt-6 px-6 md:px-8 bg-white/70 rounded-2xl backdrop-blur-lg border-neutral-200 shadow-sm"
          : "px-2 bg-transparent border-transparent"
      } ${hidden ? "-translate-y-24" : "translate-y-0"}`}
    >
      <div className="flex justify-between items-center py-4">
        <Link href="/" aria-label="Home">
          <ShoporaLogo className="h-8 w-auto text-black dark:text-white transition-colors duration-200" />
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-100 gap-1 p-2 md:w-125 md:grid-cols-2">
                  {mobileFeatures.map((feature) => (
                    <li key={feature.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href="#"
                          className="flex items-start gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-md"
                        >
                          <feature.icon className="h-4 w-4 mt-0.5 shrink-0" />
                          <div className="flex flex-col gap-1 text-sm">
                            <div className="leading-none font-medium">
                              {feature.title}
                            </div>
                            <div className="line-clamp-2 text-muted-foreground">
                              {feature.description}
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    href={link.href}
                    onClick={
                      link.label === "Pricing" ? scrollToPricing : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button className="text-sm font-medium px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer">
            Log in
          </button>
          <button className="text-sm bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 cursor-pointer">
            Start for free
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-neutral-100"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden grid transition-all duration-300 ease-out ${
          mobileOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 pb-4">
            <button
              type="button"
              className="flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md hover:bg-neutral-100"
              aria-expanded={mobileFeaturesOpen}
              onClick={() => setMobileFeaturesOpen((open) => !open)}
            >
              Features
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${
                  mobileFeaturesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                mobileFeaturesOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-1 pl-4 pb-2">
                  {mobileFeatures.map((feature) => (
                    <Link
                      key={feature.title}
                      href="#"
                      className="flex items-start gap-2 px-2 py-2 rounded-md hover:bg-neutral-100"
                      onClick={() => setMobileOpen(false)}
                    >
                      <feature.icon className="h-4 w-4 mt-0.5 shrink-0" />
                      <div className="flex flex-col text-sm">
                        <span className="font-medium leading-none">
                          {feature.title}
                        </span>
                        <span className="text-muted-foreground text-xs mt-1">
                          {feature.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-2 py-2 text-sm font-medium rounded-md hover:bg-neutral-100"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-neutral-200">
              <button className="text-sm font-medium px-4 py-2 rounded-lg border border-neutral-200 text-center">
                Log in
              </button>
              <button className="text-sm font-medium px-4 py-2 rounded-lg bg-neutral-900 text-white text-center">
                Start for free
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
