"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { createRequest } from "@/lib/requests";
import type { RequestRow } from "@/lib/supabase";

type SubmitState = {
  error?: string;
};

export async function submitRequest(
  _state: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  console.log("[submitRequest] Form submission start.");

  const requestText = String(formData.get("requestText") || "").trim();
  const emailValue = String(formData.get("email") || "").trim();
  const email = emailValue.length > 0 ? emailValue : null;

  if (requestText.length < 3) {
    console.log("[submitRequest] Validation failed: request text too short.");
    return { error: "Write a little more before releasing it." };
  }

  if (requestText.length > 4000) {
    console.log("[submitRequest] Validation failed: request text too long.");
    return { error: "Please keep the request under 4,000 characters." };
  }

  console.log("[submitRequest] Validation passed.");

  let request: RequestRow;

  try {
    console.log("[submitRequest] Supabase insert start.");
    request = await createRequest({ requestText, email });
    console.log("[submitRequest] Supabase insert succeeded.", {
      trackingId: request.tracking_id
    });
  } catch (error) {
    console.error("[submitRequest] Supabase insert failed.", error);
    return { error: "The request could not be submitted. Please try again." };
  }

  if (email) {
    try {
      console.log("[submitRequest] Confirmation email send start.", {
        trackingId: request.tracking_id
      });
      await sendConfirmationEmail(email, request.tracking_id);
      console.log("[submitRequest] Confirmation email send completed.", {
        trackingId: request.tracking_id
      });
    } catch (error) {
      console.error("[submitRequest] Confirmation email send failed.", error);
    }
  }

  console.log("[submitRequest] Redirecting to confirmation page.", {
    trackingId: request.tracking_id
  });

  redirect(`/confirmed/${request.tracking_id}`);
}

async function sendConfirmationEmail(email: string, trackingId: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    console.log("Resend not configured. Confirmation email skipped.");
    return;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to: email,
    subject: `Submitted ${trackingId}`,
    text: [
      "Request submitted successfully.",
      "",
      `Tracking ID: ${trackingId}`,
      `Track it here: ${siteUrl}/track/${trackingId}`,
      "",
      "There is nothing more you need to do right now. Close this page and return to your life."
    ].join("\n")
  });
}
