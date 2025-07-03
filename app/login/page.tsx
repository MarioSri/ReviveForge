"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import AuthLayout from "@/components/AuthLayout";
import { toast } from "sonner";
import supabase from "@/lib/supabaseBrowser";

const schema = z.object({
  email: z.string().email("Enter a valid email address")
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: { emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL + "/dashboard" }
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your inbox for a magic link");
    }
  }

  async function loginWithGitHub() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
    setLoading(false);
    if (error) toast.error(error.message);
    // On success, Supabase will redirect automatically
  }

  return (
    <AuthLayout>
      <Card className="bg-white/20 dark:bg-neutral-900/80">
        <CardHeader className="text-center text-2xl font-bold mb-2">Sign in to ReviveForge</CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <Input
              {...register("email")}
              aria-label="Email"
              placeholder="Email address"
              type="email"
              required
              className="bg-white/60 dark:bg-neutral-800"
              disabled={loading}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Magic Link"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={loginWithGitHub} disabled={loading}>
              Login with GitHub
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col items-center gap-2 mt-2">
          <span className="text-xs text-gray-400">Don't have an account? <a href="/signup" className="underline">Sign up</a></span>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
