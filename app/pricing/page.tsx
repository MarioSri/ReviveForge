"use client";
import PricingCard from "@/components/PricingCard";
import { CheckCircle } from "lucide-react";
import { useCheckout } from "@/components/useCheckout";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "$0/mo",
    features: [
      "List up to 2 projects",
      "Basic analytics",
      "Community support",
    ],
    cta: null,
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49/mo",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "AI valuation tools",
      "14-day free trial",
    ],
    cta: "Start 14-day trial",
    highlight: true,
    priceId: "pro_monthly",
  },
  {
    name: "Enterprise",
    price: "Contact us",
    features: [
      "Custom integrations",
      "Dedicated manager",
      "SLA & compliance",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

function FeatureCheckmark({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <CheckCircle className="text-green-500 w-4 h-4" aria-hidden />
      <span>{children}</span>
    </div>
  );
}

export default function PricingPage() {
  const handleCheckout = useCheckout();
  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Pricing</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.name}
            name={tier.name}
            price={tier.price}
            highlight={tier.highlight}
          >
            <div className="space-y-2 mb-6">
              {tier.features.map((f) => (
                <FeatureCheckmark key={f}>{f}</FeatureCheckmark>
              ))}
            </div>
            {tier.cta && tier.name === "Pro" ? (
              <Button
                className="w-full"
                onClick={() => handleCheckout(tier.priceId!)}
                aria-label="Start 14-day trial"
              >
                {tier.cta}
              </Button>
            ) : tier.cta ? (
              <Button className="w-full" variant="outline" disabled>
                {tier.cta}
              </Button>
            ) : null}
          </PricingCard>
        ))}
      </div>
    </main>
  );
}
