"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useCreateCheckout } from "@/lib/api";

export function useCheckout() {
  const router = useRouter();
  const toast = useToast();
  const { mutateAsync: createCheckout } = useCreateCheckout();
  return async (priceId: string) => {
    const t = toast.loading("Redirecting to checkout...");
    try {
      const { checkoutUrl } = await createCheckout(priceId);
      toast.dismiss(t);
      router.push(checkoutUrl);
    } catch (e) {
      toast.dismiss(t);
      toast.error("Checkout failed");
    }
  };
}
