"use client";

import { useEffect, useRef, useState } from "react";

const TALLY_FORM_ID = "wQZ5jG";
const TALLY_SRC =
  `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
const TALLY_WIDGET_SCRIPT = "https://tally.so/widgets/embed.js";
const TALLY_FORM_PAGE = `https://tally.so/r/${TALLY_FORM_ID}`;

// Guards the widget-script injection so it only ever runs once per page —
// without this, React Strict Mode's double-invoked mount effect (dev only,
// but the same class of bug we already hit with the Vidalytics embed) can
// race a second fallback attempt against the first script load.
let tallyScriptRequested = false;

function ensureTallyScript(onReady: () => void) {
  const w = window as unknown as { Tally?: { loadEmbeds: () => void } };
  if (typeof w.Tally !== "undefined") {
    onReady();
    return;
  }
  if (tallyScriptRequested) {
    const check = setInterval(() => {
      if (typeof (window as any).Tally !== "undefined") {
        clearInterval(check);
        onReady();
      }
    }, 150);
    setTimeout(() => clearInterval(check), 8000);
    return;
  }
  tallyScriptRequested = true;
  const script = document.createElement("script");
  script.src = TALLY_WIDGET_SCRIPT;
  script.onload = onReady;
  script.onerror = onReady; // still try the manual fallback below
  document.body.appendChild(script);
}

export default function TallyEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "timeout">("loading");

  useEffect(() => {
    const applySrc = () => {
      const el = iframeRef.current;
      if (el && !el.getAttribute("src")) {
        el.src = TALLY_SRC;
      }
    };

    ensureTallyScript(() => {
      const w = window as unknown as { Tally?: { loadEmbeds: () => void } };
      if (typeof w.Tally !== "undefined") {
        w.Tally!.loadEmbeds();
      }
      applySrc();
    });

    // The iframe's own `load` event isn't trustworthy here: a request that
    // gets blocked (ad-blocker, extension, offline) still fires `load` for
    // the resulting blank/error page, which is exactly how the form ended
    // up rendering as an empty white box before this fix. Tally's widget
    // posts a genuine `Tally.FormLoaded` message once the real form has
    // rendered — that's the only signal we treat as success.
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://tally.so") return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data?.event === "Tally.FormLoaded") {
          setStatus("ready");
        }
      } catch {
        // not a JSON message from Tally — ignore
      }
    };
    window.addEventListener("message", onMessage);

    // If the real form hasn't confirmed itself loaded within a few
    // seconds, fall back to a direct link instead of leaving a blank box.
    const timeout = setTimeout(() => {
      setStatus((current) => (current === "loading" ? "timeout" : current));
    }, 7000);

    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative rounded-2xl bg-white p-2 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06),0_20px_45px_-20px_rgba(0,0,0,0.5)] sm:p-3">
      {status !== "ready" && (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 px-6 text-center">
          {status === "loading" ? (
            <>
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-gold" />
              <span className="text-sm text-slate-500">Loading the application form&hellip;</span>
            </>
          ) : (
            <>
              <span className="text-sm text-slate-600">
                The form didn&rsquo;t load — this can happen if a browser
                extension is blocking it.
              </span>
              <a
                href={TALLY_FORM_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 font-display text-[13px] font-bold text-[#04101f] transition-colors hover:brightness-110"
              >
                Open the application in a new tab
              </a>
            </>
          )}
        </div>
      )}
      <iframe
        ref={iframeRef}
        loading="eager"
        width="100%"
        height={430}
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Apply For Your Free Strategy Call"
        className={status === "ready" ? "rounded-xl" : "hidden"}
      />
    </div>
  );
}
