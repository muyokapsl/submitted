import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh bg-paper">
      <section className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-between px-6 py-8 sm:px-10 sm:py-12">
        <nav className="flex items-center justify-between text-sm">
          <Link href="/" className="font-medium uppercase text-ink">
            SUBMITTED
          </Link>
          <Link href="/submit" className="text-ink/60 transition hover:text-ink">
            Submit
          </Link>
        </nav>

        <div className="max-w-3xl py-24 sm:py-32">
          <p className="mb-8 text-sm uppercase text-blue">
            Private by design
          </p>
          <h1 className="max-w-2xl text-5xl font-normal leading-[1.04] text-ink sm:text-7xl">
            A place to release what you cannot control.
          </h1>
          <p className="mt-8 max-w-md text-xl leading-8 text-ink/60">
            Submit once. Then let go.
          </p>
          <Link
            href="/submit"
            className="mt-12 inline-flex h-12 items-center justify-center border border-ink bg-ink px-6 text-sm font-medium text-paper transition hover:bg-paper hover:text-ink"
          >
            Submit Request
          </Link>
        </div>

        <p className="max-w-sm text-sm leading-6 text-ink/45">
          No account. No feed. No progress theatre.
        </p>
      </section>
    </main>
  );
}
