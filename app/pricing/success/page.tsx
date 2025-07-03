"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PricingSuccess() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] py-16">
      <h1 className="text-2xl font-bold mb-4">Thanks, you’re Pro now 🎉</h1>
      <Button onClick={() => router.push("/dashboard")} className="mt-4">
        Go to Dashboard
      </Button>
    </main>
  );
}
