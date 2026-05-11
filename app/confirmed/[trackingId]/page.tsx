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

        <div className="flex flex-1 flex-col justify-center py-24 sm:py-32">
          <p className="mb-8 text-sm uppercase text-blue">
            REQUEST RECEIVED
          </p>
          <p className="text-2xl font-normal text-ink sm:text-3xl">
            It has been submitted.
          </p>

          <div className="mt-12 w-full max-w-sm border border-line bg-mist px-5 py-4">
            <p className="text-xs uppercase text-ink/40">Tracking ID</p>
            <p className="mt-3 text-3xl font-normal text-ink sm:text-4xl">
              {request.tracking_id}
            </p>
          </div>

          <p className="mt-14 max-w-xl text-xl leading-9 text-ink/60">
            There is nothing more to do right now.
          </p>
          <p className="mt-8 max-w-xl text-xl leading-9 text-ink/55">
            Do not check.
            <br />
            Do not repeat.
            <br />
            Do not carry it.
          </p>
          <p className="mt-12 max-w-xl text-xl leading-9 text-ink">
            Close this page and return to your life.
          </p>
          <Link
            href={`/track/${request.tracking_id}`}
            className="mt-20 w-fit border-b border-line pb-1 text-sm text-ink/35 transition hover:border-ink/45 hover:text-ink/55"
          >
            View tracking page
          </Link>
        </div>
      </section>
    </main>
  );
}
