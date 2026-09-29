import Image from "next/image";

/** Logo mark on a light tile: the mark's lower half is dark navy and disappears on the page background. */
export default function WebinarLogo() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-[0_0_20px_rgba(59,130,246,0.25)]">
        <Image src="/logo.png" alt="" width={28} height={25} priority />
      </span>
      <span className="font-display text-[15px] font-extrabold tracking-wide">
        FOR THE CULTURE <span className="text-gold-bright">FX</span>
      </span>
    </div>
  );
}
