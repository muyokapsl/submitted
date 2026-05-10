import Link from "next/link";
import { SubmitForm } from "./SubmitForm";

export default function SubmitPage() {
  return (
    <main className="min-h-dvh bg-paper">
      <section className="mx-auto w-full max-w-3xl px-6 py-8 sm:px-10 sm:py-12">
        <Link href="/" className="text-sm font-medium uppercase text-ink">
          SUBMITTED
        </Link>

        <div className="pt-20 sm:pt-28">
          <p className="mb-6 text-sm uppercase text-blue">
            Submit once
          </p>
          <h1 className="text-4xl font-normal leading-tight text-ink sm:text-6xl">
            Put it down here.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-ink/60">
            This is private. You will receive a tracking ID after submission.
          </p>

          <SubmitForm />
        </div>
      </section>
    </main>
  );
}
