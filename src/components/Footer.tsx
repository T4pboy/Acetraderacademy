import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 pb-11 pt-9 text-center">
      <Link href="#top" className="mb-1.5 inline-block font-display text-[15px] font-extrabold tracking-wide">
        FOR THE CULTURE <span className="text-gold-bright">FX</span>
      </Link>
      <p className="text-[12.5px] text-text-muted">&copy; {new Date().getFullYear()} For The Culture FX. All rights reserved.</p>
    </footer>
  );
}
