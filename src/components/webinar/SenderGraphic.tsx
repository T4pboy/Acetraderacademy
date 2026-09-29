/**
 * Pure HTML/CSS imitation of Gmail's "unknown sender" warning, so attendees
 * know which button to press in the email they just received.
 */
export default function SenderGraphic() {
  return (
    <div className="mx-auto mt-8 max-w-[520px]" aria-label="Example of the Gmail unknown sender warning">
      <div className="relative mb-4 rounded-2xl bg-gradient-to-br from-gold to-gold-bright px-5 py-4 text-center font-display text-[14px] font-bold leading-snug text-[#04101f] shadow-[0_0_30px_rgba(255,193,56,0.3)]">
        Press this &ldquo;I know sender&rdquo; button in the email you just received from us!
        <span
          aria-hidden="true"
          className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-gold-bright"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]">
        <p className="mb-1 text-[13px] font-semibold text-slate-800">Be careful with this message</p>
        <p className="mb-5 text-[12.5px] leading-relaxed text-slate-500">
          This message seems dangerous. Similar messages were used to steal people&rsquo;s personal information. Avoid
          clicking links or downloading attachments unless you know and trust the sender.
        </p>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="block rounded-md border-2 border-dashed border-error p-1">
              <span className="block rounded bg-blue-600 px-3.5 py-2 text-[12.5px] font-semibold text-white">
                I know the sender
              </span>
            </span>
            <span
              aria-hidden="true"
              className="absolute -top-7 left-1/2 -translate-x-1/2 text-[20px] font-bold leading-none text-error"
            >
              ↓
            </span>
          </div>
          <span className="rounded bg-slate-100 px-3.5 py-2 text-[12.5px] font-semibold text-slate-400">
            Report spam
          </span>
        </div>
      </div>
    </div>
  );
}
