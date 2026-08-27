type Props = {
  children: React.ReactNode;
  /** Pass a max-w-[...] utility to size the container per step. */
  className?: string;
};

/**
 * A white "sheet" that floats on the page's dark background — used to hold
 * a single step's content (Step 2's FAQs, Step 3's proof) rather than the
 * section itself going full-bleed white. The dark backdrop stays visible
 * around and between containers.
 */
export default function WhiteContainer({ children, className = "" }: Props) {
  return (
    <div
      className={`mx-auto rounded-[28px] bg-white px-6 py-16 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:px-12 sm:py-20 ${className}`}
    >
      {children}
    </div>
  );
}
