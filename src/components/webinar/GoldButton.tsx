import Link from "next/link";

const BASE =
  "inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-bright px-9 py-[19px] text-center font-display text-[14.5px] font-extrabold uppercase tracking-wide text-[#04101f] shadow-[0_0_30px_rgba(255,193,56,0.35),0_10px_25px_-8px_rgba(255,193,56,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:w-auto";

/** Gold pill link used for plain navigation (anchors, external, internal). */
export default function GoldButton({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  if (external || href.startsWith("#") || href.startsWith("/webinar/calendar")) {
    return (
      <a
        href={href}
        className={BASE}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={BASE}>
      {children}
    </Link>
  );
}
