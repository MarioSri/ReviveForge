import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import * as Sentry from "@sentry/nextjs";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json([], { status: 401 });
    const { data, error } = await supabase
      .from("user_checklists")
      .select("step")
      .eq("userId", session.user.id);
    if (error) throw error;
    return NextResponse.json(data.map((r: any) => r.step));
  } catch (e) {
    Sentry.captureException(e);
    return NextResponse.json({ error: "Failed to fetch checklist" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json([], { status: 401 });
    const { step } = await req.json();
    if (!['profile','browse','valuation','offer'].includes(step)) return NextResponse.json({ error: "Invalid step" }, { status: 400 });
    const { error } = await supabase
      .from("user_checklists")
      .upsert({ userId: session.user.id, step, completedAt: new Date().toISOString() }, { onConflict: ["userId", "step"] });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    Sentry.captureException(e);
    return NextResponse.json({ error: "Failed to update checklist" }, { status: 500 });
  }
}
