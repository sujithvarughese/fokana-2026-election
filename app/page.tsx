const PDF_PATH = "/delegates.pdf";

// `#toolbar=0` hides the browser PDF viewer's toolbar (download / print / save
// buttons) so the list is view-only; `view=FitH` fits each page to the window
// width so the PDF renders almost edge-to-edge on load.
const PDF_VIEW = `${PDF_PATH}#toolbar=0&navpanes=0&view=FitH`;

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="w-full border-b border-zinc-200 bg-white px-6 py-6 dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto flex max-w-5xl flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            FOKANA 2026 Election
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Updated list of delegates eligible to vote
          </p>
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
