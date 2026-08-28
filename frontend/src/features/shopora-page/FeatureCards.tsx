import { cn } from "@/lib/utils";
import {
  Building2,
  CreditCard,
  Layers,
  PackageSearch,
  FolderTree,
  ShieldCheck,
  Zap,
  LayoutDashboard,
} from "lucide-react";

export function FeaturesCards() {
  const features = [
    {
      title: "Multi-tenant architecture",
      description:
        "Run multiple independent stores on a single platform, each with isolated data and its own storefront.",
      icon: <Building2 />,
    },
    {
      title: "Product & variant management",
      description:
        "Manage products with unlimited option combinations — sizes, colors, and more — grouped just like Shopify.",
      icon: <Layers />,
    },
    {
      title: "Secure checkout with Stripe",
      description:
        "Accept payments confidently with Stripe-powered checkout and webhook-verified order creation.",
      icon: <CreditCard />,
    },
    {
      title: "Real-time inventory tracking",
      description:
        "Stock levels update automatically on every sale, with low-stock threshold alerts built in.",
      icon: <PackageSearch />,
    },
    {
      title: "Category organization",
      description:
        "Structure your catalog with nested, self-referencing categories for easy browsing and filtering.",
      icon: <FolderTree />,
    },
    {
      title: "Secure authentication",
      description:
        "Sign in with email or Google OAuth, backed by a hardened auth layer built for production.",
      icon: <ShieldCheck />,
    },
    {
      title: "Built for speed",
      description:
        "A fast, modern platform engineered for quick load times and a smooth shopping experience.",
      icon: <Zap />,
    },
    {
      title: "Full admin dashboard",
      description:
        "Manage products, orders, categories, and stores from one clean, purpose-built admin interface.",
      icon: <LayoutDashboard />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800",
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
