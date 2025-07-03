"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PricingCancel() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] py-16">
      <h1 className="text-2xl font-bold mb-4">Checkout cancelled</h1>
      <Button onClick={() => router.push("/pricing")} className="mt-4" variant="outline">
        Back to Pricing
      </Button>
    </main>
  );
}
