export type BillingCycle = "monthly" | "annual";

interface Plan {
  key: "free" | "pro" | "custom";
  name: string;
  tagline: string;
  price: number | null;
  priceSuffix: string;
  cta: string;
  popular: boolean;
  features: string[];
  extraFeatures?: string[];
}

export const PLANS: Record<BillingCycle, Plan[]> = {
  monthly: [
    {
      key: "free",
      name: "Free",
      tagline: "Test the waters with your first store",
      price: 0,
      priceSuffix: "/mo",
      cta: "Start for free",
      popular: false,
      features: [
        "1 storefront",
        "Up to 50 products",
        "500MB media storage",
        "Community support",
        "Shopora branding on checkout",
      ],
    },
    {
      key: "pro",
      name: "Pro",
      tagline: "For stores ready to scale up",
      price: 29,
      priceSuffix: "/mo",
      cta: "Start free trial",
      popular: true,
      features: [
        "Unlimited products",
        "50GB media storage",
        "Custom domain",
        "Abandoned cart recovery",
        "Discount codes & coupons",
        "Remove Shopora branding",
      ],
      extraFeatures: [
        "Priority support",
        "Advanced analytics",
        "5 staff accounts",
      ],
    },
    {
      key: "custom",
      name: "Customize",
      tagline: "For multi-brand & high-volume merchants",
      price: null,
      priceSuffix: "",
      cta: "Talk to sales",
      popular: false,
      features: [
        "Multi-store management",
        "Dedicated infrastructure",
        "Custom API rate limits",
        "SLA & uptime guarantee",
        "Dedicated account manager",
      ],
      extraFeatures: [
        "SSO & SAML",
        "White-label platform",
        "Custom contract terms",
      ],
    },
  ],
  annual: [
    {
      key: "free",
      name: "Free",
      tagline: "Test the waters with your first store",
      price: 0,
      priceSuffix: "/mo",
      cta: "Start for free",
      popular: false,
      features: [
        "1 storefront",
        "Up to 50 products",
        "500MB media storage",
        "Community support",
        "Shopora branding on checkout",
      ],
    },
    {
      key: "pro",
      name: "Pro",
      tagline: "For stores ready to scale up",
      price: 24,
      priceSuffix: "/mo",
      cta: "Start free trial",
      popular: true,
      features: [
        "Unlimited products",
        "50GB media storage",
        "Custom domain",
        "Abandoned cart recovery",
        "Discount codes & coupons",
        "Remove Shopora branding",
      ],
      extraFeatures: [
        "Priority support",
        "Advanced analytics",
        "5 staff accounts",
      ],
    },
    {
      key: "custom",
      name: "Customize",
      tagline: "For multi-brand & high-volume merchants",
      price: null,
      priceSuffix: "",
      cta: "Talk to sales",
      popular: false,
      features: [
        "Multi-store management",
        "Dedicated infrastructure",
        "Custom API rate limits",
        "SLA & uptime guarantee",
        "Dedicated account manager",
      ],
      extraFeatures: [
        "SSO & SAML",
        "White-label platform",
        "Custom contract terms",
      ],
    },
  ],
};
