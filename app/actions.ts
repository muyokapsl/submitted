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
  const hasEmailValue = emailValue.length > 0;
  const isEmailValid = hasEmailValue ? isValidEmail(emailValue) : false;
  const email = hasEmailValue && isEmailValid ? emailValue : null;

  console.log("[submitRequest] Form fields parsed.", {
    hasRequestText: requestText.length > 0,
    hasEmailValue,
    sanitizedEmailValueLength: emailValue.length,
    willUseEmail: Boolean(email),
    maskedEmail: hasEmailValue ? maskEmail(emailValue) : null
  });

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

  console.log("[submitRequest] Email field parsed.", {
    hasEmail: Boolean(email)
  });

  if (email) {
    try {
      console.log("[submitRequest] Confirmation email requested.", {
        trackingId: request.tracking_id
      });
      await sendConfirmationEmail(email, request.tracking_id);
      console.log("[submitRequest] Confirmation email send completed.", {
        trackingId: request.tracking_id
      });
    } catch (error) {
      console.error("[submitRequest] Confirmation email failed.", error);
    }
  } else if (hasEmailValue) {
    console.log("[submitRequest] Invalid email provided. Skipping confirmation email.");
  } else {
    console.log("[submitRequest] No email provided. Skipping confirmation email.");
  }

  console.log("[submitRequest] Redirecting to confirmation page.", {
    trackingId: request.tracking_id
  });

  redirect(`/confirmed/${request.tracking_id}`);
}

async function sendConfirmationEmail(email: string, trackingId: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://submitted-delta.vercel.app";

  console.log("[sendConfirmationEmail] Config check.", {
    hasApiKey: Boolean(apiKey),
    hasFrom: Boolean(from),
    siteUrl
  });

  if (!apiKey || !from) {
    console.log("Resend not configured. Confirmation email skipped.");
    return;
  }

  const resend = new Resend(apiKey);

  const result = await resend.emails.send({
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

  console.log("[sendConfirmationEmail] Resend response.", {
    id: result.data?.id,
    hasError: Boolean(result.error),
    error: result.error
  });

  if (result.error) {
    console.error("[sendConfirmationEmail] Resend returned error.", result.error);
    throw result.error;
  }
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function maskEmail(email: string) {
  const [localPart, domain] = email.split("@");

  if (!localPart || !domain) {
    return "(invalid email format)";
  }

  const visibleLocal = localPart.slice(0, 2);

  return `${visibleLocal}${"*".repeat(Math.max(localPart.length - 2, 1))}@${domain}`;
}
