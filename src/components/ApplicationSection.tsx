import TallyEmbed from "./TallyEmbed";

export default function ApplicationSection() {
  return (
    <section id="apply" className="px-6 py-16 md:py-22">
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <h2 className="mb-3.5 text-[1.7rem] font-extrabold leading-tight text-balance md:text-[2.1rem]">
            Next, apply to see if the <span className="grad-text">A.C.E. Method</span> is right for you
          </h2>
          <p className="text-text-muted">
            A short application — not a sales call. We review every
            submission to see if it&rsquo;s a fit before we talk.
          </p>
        </div>

        <div className="mx-auto max-w-[720px]">
          <TallyEmbed />
        </div>
      </div>
    </section>
  );
}
