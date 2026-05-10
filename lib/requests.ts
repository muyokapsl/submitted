import { getSupabaseAdmin, type RequestRow } from "@/lib/supabase";

type CreateRequestInput = {
  requestText: string;
  email: string | null;
};

export async function createRequest({
  requestText,
  email
}: CreateRequestInput): Promise<RequestRow> {
  const supabase = getSupabaseAdmin();

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const trackingId = generateTrackingId();
    const { data, error } = await supabase
      .from("requests")
      .insert({
        tracking_id: trackingId,
        request_text: requestText,
        email
      })
      .select()
      .single<RequestRow>();

    if (!error && data) {
      return data;
    }

    if (error?.code !== "23505") {
      throw error;
    }
  }

  throw new Error("Unable to generate a unique tracking ID.");
}

export async function getRequestByTrackingId(
  trackingId: string
): Promise<RequestRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("requests")
    .select()
    .eq("tracking_id", trackingId.toUpperCase())
    .single<RequestRow>();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return data;
}

export async function incrementCheckedCount(trackingId: string) {
  const supabase = getSupabaseAdmin();

  await supabase.rpc("increment_checked_count", {
    request_tracking_id: trackingId.toUpperCase()
  });
}

function generateTrackingId() {
  const value = Math.floor(10000 + Math.random() * 90000);

  return `SUB-${value}`;
}
