import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-bg-primary/70 px-6 py-4 backdrop-blur-md">
      <Link href="#top" className="font-display text-[15px] font-extrabold tracking-wide">
        FOR THE CULTURE <span className="text-gold-bright">FX</span>
      </Link>
      <Link
        href="#apply"
        className="inline-flex min-h-10 items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-display text-[13px] font-bold tracking-wide text-[#04101f] shadow-[0_0_20px_rgba(255,193,56,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(255,212,116,0.55)] hover:brightness-110"
      >
        Apply
      </Link>
    </header>
  );
}
