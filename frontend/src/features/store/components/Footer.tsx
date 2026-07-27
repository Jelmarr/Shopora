import Link from "next/link";

const footerLinks = {
  company: [
    { label: "Search", href: "/search" },
    { label: "Contact", href: "/contact" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  pages: [
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "Collections", href: "/collections" },
  ],
  shop: [
    { label: "Tops", href: "/category/tops" },
    { label: "T-shirts", href: "/category/t-shirts" },
    { label: "Knitwear", href: "/category/knitwear" },
    { label: "Dresses", href: "/category/dresses" },
    { label: "Bottoms", href: "/category/bottoms" },
    { label: "Jackets & Coats", href: "/category/jackets-coats" },
  ],
};

interface FooterProps {
  storeName: string;
}

const Footer = ({ storeName }: FooterProps) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#141414] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-widest text-white/50">
              Newsletter
            </span>
            <p className="font-medium">
              Sign up to receive 10% off your first order
            </p>

            <form className="flex w-full max-w-sm bg-white rounded-md overflow-hidden">
              <input
                type="email"
                required
                placeholder="Email address"
                className="flex-1 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />
              <button
                type="submit"
                className="px-4 text-xs font-semibold tracking-widest uppercase text-gray-900 hover:text-black"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-widest text-white/50">
              Company
            </span>
            {footerLinks.company.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/90 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-widest text-white/50">
              Pages
            </span>
            {footerLinks.pages.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/90 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-widest text-white/50">
              Shop
            </span>
            {footerLinks.shop.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/90 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">
            {storeName}
          </h2>
          <p className="text-sm text-white/60 max-w-md">
            {storeName} is powered by Shopora.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-white/50">
          <p>
            Copyright &copy; {year} {storeName}. All rights reserved. Powered by
            Shopora.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
