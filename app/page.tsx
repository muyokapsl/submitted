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
            PRIVATE BY DESIGN
          </p>
          <h1 className="max-w-2xl text-5xl font-normal leading-[1.04] text-ink sm:text-7xl">
            Submit what you cannot stop carrying.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-ink/60">
            Write down a thought, wish, worry, or intention. Submitted gives it
            a tracking ID, confirms it was received, and reminds you to stop
            checking.
          </p>
          <Link
            href="/submit"
            className="mt-12 inline-flex h-12 items-center justify-center border border-ink bg-ink px-6 text-sm font-medium text-paper transition hover:bg-paper hover:text-ink"
          >
            Submit Request
          </Link>
        </div>

        <div>
          <section className="border-t border-line pt-8">
            <h2 className="text-sm font-medium text-ink">How it works</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-ink">Write it down</p>
                <p className="mt-2 text-sm leading-6 text-ink/55">
                  Put the thought into words.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-ink">Submit once</p>
                <p className="mt-2 text-sm leading-6 text-ink/55">
                  Receive a private tracking ID.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-ink">Close the page</p>
                <p className="mt-2 text-sm leading-6 text-ink/55">
                  Checking again will not move it faster.
                </p>
              </div>
            </div>
          </section>
          <p className="mt-8 max-w-sm text-sm leading-6 text-ink/45">
            No account. No feed. No ads. No reason to stay.
          </p>
        </div>
      </section>
    </main>
  );
}
