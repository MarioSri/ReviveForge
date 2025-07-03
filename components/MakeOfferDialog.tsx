"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOffer } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
  amount: z.number().min(100, "Minimum offer is $100")
});

type FormData = z.infer<typeof schema>;

export default function MakeOfferDialog({ projectId, isOpen, onClose }: { projectId: string, isOpen: boolean, onClose: () => void }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const createOffer = useCreateOffer();

  async function onSubmit(data: FormData) {
    const { error } = await createOffer.mutateAsync({ projectId, amount: data.amount });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Offer sent 🎉");
      onClose();
      router.push("/dashboard?tab=sent");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make an Offer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="number"
            step="1"
            min={100}
            placeholder="Offer Amount (USD)"
            aria-label="Offer Amount"
            {...register("amount", { valueAsNumber: true })}
            className="rounded bg-gray-900 px-3 py-2 text-white"
            required
            disabled={isSubmitting}
          />
          {errors.amount && <span className="text-red-500 text-xs">{errors.amount.message}</span>}
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? "Submitting..." : "Submit Offer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
