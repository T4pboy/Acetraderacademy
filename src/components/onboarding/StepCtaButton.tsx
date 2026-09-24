type Props = {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

/**
 * The gold pill CTA used by the link-out steps (book a call, join Discord,
 * access the library) — same treatment as Hero's "Start Application"
 * button, just reused here so all three placeholder links look identical.
 */
export default function StepCtaButton({ href, children, icon }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-12 items-center gap-1.5 rounded-2xl bg-gold px-4 py-3 font-display text-[11.5px] font-bold uppercase leading-snug tracking-wide text-[#04101f] shadow-[0_0_20px_rgba(255,193,56,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,212,116,0.55)] sm:gap-2 sm:rounded-full sm:px-6 sm:text-[14px]"
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </a>
  );
}
