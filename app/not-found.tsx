import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-paper px-6">
      <div className="max-w-md text-center">
        <p className="mb-6 text-sm uppercase text-blue">
          Not found
        </p>
        <h1 className="text-4xl font-normal text-ink">
          Nothing is here.
        </h1>
        <Link
          href="/"
          className="mt-8 inline-flex border-b border-line pb-1 text-sm text-ink/55 transition hover:border-ink hover:text-ink"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
