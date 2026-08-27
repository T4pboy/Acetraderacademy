import StepBadge from "./StepBadge";
import VideoSlot from "./VideoSlot";
import WhiteContainer from "./WhiteContainer";
import WistiaVideo from "@/components/WistiaVideo";

const FAQ_ITEMS = [
  { mediaId: "ahu3h3suf6", question: "I keep failing my prop firm eval. I don't think I can pass one." },
  { mediaId: "41wmk89a73", question: "I've tried other courses and lost money. Why would this be different?" },
  { mediaId: "tn7f1nuxxt", question: "What if I still don't get funded even after this?" },
  { mediaId: "ybpudpc3rt", question: "How much time until results?" },
];

export default function FaqStepSection() {
  return (
    <section className="px-6 py-16 md:py-24">
      <WhiteContainer className="max-w-[900px]">
        <div className="mx-auto mb-14 max-w-[560px] text-center">
          <div className="mb-5 flex justify-center">
            <StepBadge step="Step 2" tone="light">Get Your Questions Answered</StepBadge>
          </div>
          <h2 className="text-[1.5rem] font-extrabold leading-tight text-slate-900 sm:text-[1.8rem]">
            What Is The <span className="text-brand-blue">A.C.E. Method?</span>
          </h2>
          <p className="mt-3 text-[13.5px] text-slate-500">
            New — a quick visual explainer before you dive into the FAQs
            below.
          </p>
        </div>

        <VideoSlot size="featured" label="Visual Explainer" tone="light" />

        <div className="mt-20">
          <p className="mb-12 text-center font-display text-[12px] font-bold uppercase tracking-[.14em] text-slate-500">
            Watch Our Most Frequently Asked Questions
          </p>
          <div className="grid grid-cols-1 gap-x-14 gap-y-20 sm:grid-cols-2">
            {FAQ_ITEMS.map(({ mediaId, question }) => (
              <div key={mediaId}>
                <p className="mb-5 text-center text-[1.05rem] font-bold leading-snug text-slate-900 sm:text-[1.1rem]">
                  {question}
                </p>
                <WistiaVideo mediaId={mediaId} />
              </div>
            ))}
          </div>
        </div>
      </WhiteContainer>
    </section>
  );
}
