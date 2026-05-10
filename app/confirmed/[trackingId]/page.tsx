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

        <div className="flex flex-1 flex-col justify-center py-20">
          <p className="mb-6 text-sm uppercase text-blue">
            Request submitted.
          </p>
          <p className="text-sm text-ink/45">Tracking ID:</p>
          <h1 className="text-5xl font-normal text-ink sm:text-7xl">
            {request.tracking_id}
          </h1>
          <p className="mt-8 text-sm text-ink/45">Status</p>
          <p className="mt-2 text-2xl font-normal text-ink">{request.status}</p>
          <p className="mt-8 max-w-xl text-xl leading-9 text-ink/60">
            There is nothing more you need to do right now. Close this page and
            return to your life.
          </p>
          <Link
            href={`/track/${request.tracking_id}`}
            className="mt-12 w-fit border-b border-line pb-1 text-sm text-ink/50 transition hover:border-ink hover:text-ink"
          >
            View tracking page
          </Link>
        </div>
      </section>
    </main>
  );
}
