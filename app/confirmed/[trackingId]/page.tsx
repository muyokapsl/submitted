import Link from "next/link";
import { notFound } from "next/navigation";
import { getRequestByTrackingId } from "@/lib/requests";

export const dynamic = "force-dynamic";

type ConfirmedPageProps = {
  params: Promise<{
    trackingId: string;
  }>;
};

export default async function ConfirmedPage({ params }: ConfirmedPageProps) {
  const { trackingId } = await params;

  console.log("[confirmed] Fetch start.", { trackingId });

  const request = await getRequestByTrackingId(trackingId);

  if (!request) {
    console.warn("[confirmed] Request not found.", { trackingId });
    notFound();
  }

  console.log("[confirmed] Fetch complete.", {
    trackingId: request.tracking_id,
    status: request.status
  });

  return (
    <main className="min-h-dvh bg-paper">
      <section className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-6 py-8 sm:px-10 sm:py-12">
        <Link href="/" className="text-sm font-medium uppercase text-ink">
          SUBMITTED
        </Link>

        <div className="flex flex-1 flex-col justify-center py-24 sm:py-28">
          <p className="mb-10 text-sm uppercase text-blue">
            REQUEST RECEIVED
          </p>
          <p className="text-2xl font-normal text-ink sm:text-3xl">
            Request submitted.
          </p>
          <h1 className="mt-10 text-4xl font-normal text-ink sm:text-6xl">
            {request.tracking_id}
          </h1>
          <p className="mt-12 max-w-xl text-xl leading-9 text-ink/60">
            There is nothing more to do right now.
          </p>
          <p className="mt-8 max-w-xl text-xl leading-9 text-ink/60">
            Do not check.
            <br />
            Do not repeat.
            <br />
            Do not carry it.
          </p>
          <p className="mt-8 max-w-xl text-xl leading-9 text-ink/60">
            Close this page and return to your life.
          </p>
          <Link
            href={`/track/${request.tracking_id}`}
            className="mt-16 w-fit border-b border-line pb-1 text-sm text-ink/45 transition hover:border-ink hover:text-ink"
          >
            View tracking page
          </Link>
        </div>
      </section>
    </main>
  );
}
