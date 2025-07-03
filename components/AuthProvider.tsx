"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{ session: Session | null }>({ session: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient();
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => listener.subscription.unsubscribe();
  }, [supabase]);
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={session}>
      <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
    </SessionContextProvider>
  );
}

export function useSession(required = false) {
  const { session } = useContext(AuthContext);
  const router = useRouter();
  if (required && !session) {
    if (typeof window !== "undefined") router.replace("/login");
  }
  return session;
}
