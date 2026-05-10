import Link from "next/link";
import { notFound } from "next/navigation";
import { getRequestByTrackingId, incrementCheckedCount } from "@/lib/requests";

export const dynamic = "force-dynamic";

const statuses = ["Submitted", "Processing", "Still unfolding", "Delivered"];

type TrackPageProps = {
  params: Promise<{
    trackingId: string;
  }>;
};

export default async function TrackPage({ params }: TrackPageProps) {
  const { trackingId } = await params;

  console.log("[track] Fetch start.", { trackingId });

  const request = await getRequestByTrackingId(trackingId);

  if (!request) {
    console.warn("[track] Request not found.", { trackingId });
    notFound();
  }

  const updatedRequest = await incrementCheckedCount(request.tracking_id);

  if (!updatedRequest) {
    console.warn("[track] Request not found during checked_count increment.", {
      trackingId: request.tracking_id
    });
    notFound();
  }

  console.log("[track] Fetch and increment complete.", {
    trackingId: updatedRequest.tracking_id,
    status: updatedRequest.status,
    checkedCount: updatedRequest.checked_count
  });

  const activeIndex = Math.max(0, statuses.indexOf(updatedRequest.status));

  return (
    <main className="min-h-dvh bg-paper">
      <section className="mx-auto w-full max-w-3xl px-6 py-8 sm:px-10 sm:py-12">
        <Link href="/" className="text-sm font-medium uppercase text-ink">
          SUBMITTED
        </Link>

        <div className="pt-20 sm:pt-28">
          <p className="mb-6 text-sm uppercase text-blue">
            Tracking ID
          </p>
          <h1 className="text-5xl font-normal text-ink sm:text-7xl">
            {updatedRequest.tracking_id}
          </h1>

          <div className="mt-12 border-y border-line py-8">
            <p className="text-sm text-ink/45">Status</p>
            <p className="mt-3 text-3xl font-normal text-ink">{updatedRequest.status}</p>
            <p className="mt-8 text-sm text-ink/45">Checked count</p>
            <p className="mt-3 text-3xl font-normal text-ink">
              {updatedRequest.checked_count}
            </p>
          </div>

          <ol className="mt-10 space-y-4">
            {statuses.map((status, index) => {
              const isActive = index <= activeIndex;

              return (
                <li key={status} className="flex items-center gap-4">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isActive ? "bg-blue" : "bg-line"
                    }`}
                  />
                  <span className={isActive ? "text-ink" : "text-ink/35"}>
                    {status}
                  </span>
                </li>
              );
            })}
          </ol>

          <p className="mt-12 max-w-md text-lg leading-8 text-ink/60">
            Checking again will not speed up the process.
          </p>
        </div>
      </section>
    </main>
  );
}
