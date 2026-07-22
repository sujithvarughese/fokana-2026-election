import Image from "next/image";
import { statSync } from "node:fs";
import { join } from "node:path";

// Read the PDF's modification time fresh on every request so the "last updated"
// stamp always reflects the most recent upload of the file on disk.
export const dynamic = "force-dynamic";

const PDF_FILE = "delegates.pdf";
const PDF_PATH = `/${PDF_FILE}`;

// `#toolbar=0` hides the browser PDF viewer's toolbar (download / print / save
// buttons) so the list is view-only; `view=FitH` fits each page to the window
// width so the PDF renders almost edge-to-edge on load.
const PDF_VIEW = `${PDF_PATH}#toolbar=0&navpanes=0&view=FitH`;

// Change `timeZone` if the organization reports times in another zone.
const lastUpdatedFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "America/New_York",
});

function getLastUpdated(): string | null {
  try {
    const { mtime } = statSync(join(process.cwd(), "public", PDF_FILE));
    return `${lastUpdatedFormatter.format(mtime)} ET`;
  } catch {
    return null;
  }
}

export default function Home() {
  const lastUpdated = getLastUpdated();

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <div
        role="alert"
        className="w-full border-b border-amber-300 bg-amber-50 px-6 py-3 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200"
      >
        <p className="mx-auto max-w-5xl text-sm leading-6">
          <span className="font-semibold">Notice:</span> All updates to the
          eligible delegate list must be submitted to{" "}
          <a
            href="mailto:fokanaelection2026@gmail.com"
            className="font-medium underline underline-offset-2"
          >
            fokanaelection2026@gmail.com
          </a>{" "}
          no later than <span className="font-semibold">July 23, 2026 at 11:59 PM</span>.
          This deadline is final. No exceptions will be granted, and no
          modifications will be accepted after the cutoff time. Please verify
          that each delegate&apos;s name is spelled correctly, as the first and last names must match
          exactly as on the identification the delegate presents at the time of voting.
        </p>
      </div>

      <header className="w-full border-b border-zinc-200 bg-white px-6 py-6 dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto flex max-w-5xl items-center gap-4">
          <Image
            src="/fokana-logo.png"
            alt="FOKANA logo"
            width={180}
            height={180}
            priority
            className="shrink-0"
          />
          <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            FOKANA 2026 Election
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-200">
            Updated list of delegates eligible to vote
          </p>
          {lastUpdated && (
            <p className="mt-1 text-xs font-medium text-zinc-300 dark:text-zinc-300">
              Last updated: {lastUpdated}
            </p>
          )}
          </div>
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col px-3 py-4 sm:px-4">
        <iframe
          src={PDF_VIEW}
          title="Eligible voter delegate list"
          className="min-h-[75vh] w-full flex-1 rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800"
        />
      </main>
    </div>
  );
}
