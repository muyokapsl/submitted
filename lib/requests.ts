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

    console.log("[requests.createRequest] Tracking ID generated.", {
      trackingId,
      attempt: attempt + 1
    });

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
      console.log("[requests.createRequest] Request inserted.", {
        trackingId: data.tracking_id
      });
      return data;
    }

    if (error?.code !== "23505") {
      console.error("[requests.createRequest] Supabase insert error.", error);
      throw error;
    }

    console.warn("[requests.createRequest] Tracking ID collision, retrying.", {
      trackingId
    });
  }

  throw new Error("Unable to generate a unique tracking ID.");
}

export async function getRequestByTrackingId(
  trackingId: string
): Promise<RequestRow | null> {
  const supabase = getSupabaseAdmin();
  const normalizedTrackingId = trackingId.toUpperCase();

  console.log("[requests.getRequestByTrackingId] Fetching request.", {
    trackingId: normalizedTrackingId
  });

  const { data, error } = await supabase
    .from("requests")
    .select()
    .eq("tracking_id", normalizedTrackingId)
    .single<RequestRow>();

  if (error) {
    if (error.code === "PGRST116") {
      console.warn("[requests.getRequestByTrackingId] Request not found.", {
        trackingId: normalizedTrackingId
      });
      return null;
    }

    console.error("[requests.getRequestByTrackingId] Supabase fetch error.", error);
    throw error;
  }

  console.log("[requests.getRequestByTrackingId] Request fetched.", {
    trackingId: data.tracking_id,
    status: data.status,
    checkedCount: data.checked_count
  });

  return data;
}

export async function incrementCheckedCount(
  trackingId: string
): Promise<RequestRow | null> {
  const supabase = getSupabaseAdmin();
  const normalizedTrackingId = trackingId.toUpperCase();

  console.log("[requests.incrementCheckedCount] Increment start.", {
    trackingId: normalizedTrackingId
  });

  const { data, error } = await supabase
    .rpc("increment_checked_count", {
      request_tracking_id: normalizedTrackingId
    })
    .single<RequestRow>();

  if (error) {
    if (error.code === "PGRST116") {
      console.warn("[requests.incrementCheckedCount] Request not found.", {
        trackingId: normalizedTrackingId
      });
      return null;
    }

    console.error("[requests.incrementCheckedCount] Supabase increment error.", error);
    throw error;
  }

  console.log("[requests.incrementCheckedCount] Increment complete.", {
    trackingId: data.tracking_id,
    checkedCount: data.checked_count
  });

  return data;
}

function generateTrackingId() {
  const value = Math.floor(10000 + Math.random() * 90000);

  return `SUB-${value}`;
}
