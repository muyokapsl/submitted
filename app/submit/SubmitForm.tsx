"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitRequest } from "@/app/actions";

export function SubmitForm() {
  const [state, formAction] = useActionState(submitRequest, {});

  return (
    <form action={formAction} className="mt-12 space-y-6">
      <label className="block">
        <span className="mb-3 block text-sm text-ink/60">
          What would you like to release?
        </span>
        <textarea
          name="requestText"
          required
          rows={8}
          maxLength={4000}
          className="w-full resize-none border border-line bg-paper p-4 text-base leading-7 text-ink outline-none transition placeholder:text-ink/30 focus:border-blue"
          placeholder="A wish, a worry, a decision, a person, a future outcome, or anything you cannot control right now."
        />
      </label>

      <label className="block">
        <span className="mb-3 block text-sm text-ink/60">
          Email, optional
        </span>
        <input
          name="email"
          type="email"
          className="h-12 w-full border border-line bg-paper px-4 text-base text-ink outline-none transition placeholder:text-ink/30 focus:border-blue"
          placeholder="you@example.com"
        />
        <span className="mt-2 block text-sm text-ink/45">
          Receive your tracking link. No newsletter.
        </span>
      </label>

      {state.error ? (
        <p className="border border-line bg-mist px-4 py-3 text-sm text-ink/70">
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
      <p className="text-sm text-ink/45">
        After submission, there is nothing more to do.
      </p>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="h-12 w-full border border-ink bg-ink px-6 text-sm font-medium text-paper transition hover:bg-paper hover:text-ink disabled:cursor-wait disabled:border-ink/30 disabled:bg-ink/30 sm:w-auto"
    >
      {pending ? "Submitting" : "Submit Request"}
    </button>
  );
}
