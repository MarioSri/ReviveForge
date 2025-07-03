"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import clsx from "clsx";

interface PricingCardProps {
  name: string;
  price: string;
  highlight?: boolean;
  children: React.ReactNode;
}

export default function PricingCard({ name, price, highlight, children }: PricingCardProps) {
  return (
    <Card
      className={clsx(
        "flex flex-col items-center p-6 border-2 transition-shadow",
        highlight ? "border-primary shadow-lg" : "border-gray-200"
      )}
      aria-label={`${name} pricing tier`}
    >
      <CardHeader className="text-center">
        <CardTitle className={clsx("text-xl font-semibold", highlight && "text-primary")}>{name}</CardTitle>
        <div className="text-3xl font-bold mt-2 mb-4">{price}</div>
      </CardHeader>
      <CardContent className="flex-1 w-full flex flex-col items-center">
        {children}
      </CardContent>
    </Card>
  );
}
