"use client";

import { useEffect, useRef, useState } from "react";
import {
  BUDGET_OPTIONS,
  EMPTY_APPLY_FORM,
  EXPERIENCE_OPTIONS,
  PAIN_POINT_OPTIONS,
  TIME_OPTIONS,
  TOTAL_APPLY_STEPS,
  type ApplyFormData,
} from "@/data/applyFormConfig";
import StepShell from "./StepShell";
import ContactStep from "./ContactStep";
import SingleSelectStep from "./SingleSelectStep";
import BookingStep from "./BookingStep";

const STORAGE_KEY = "ace-apply-form-draft";

const STEP_TITLES: Record<number, string> = {
  1: "Let's start with the basics",
  2: "What's the biggest thing holding your trading back right now?",
  3: "How would you describe your experience level?",
  4: "What's your budget to get this right?",
  5: "How much time can you commit each week?",
  6: "Grab your Strategy Call time",
};

function isEmailValid(email: string) {
  return /^\S+@\S+\.\S+$/.test(email.trim());
}
function isNameValid(name: string) {
  return name.trim().length > 1;
}
function isPhoneValid(phone: string) {
  return phone.replace(/\D/g, "").length >= 7;
}
function isContactValid(d: ApplyFormData) {
  return isNameValid(d.fullName) && isEmailValid(d.email) && isPhoneValid(d.phone);
}

function isStepValid(step: number, d: ApplyFormData) {
  switch (step) {
    case 1:
      return isContactValid(d);
    case 2:
      return d.painPoint !== "";
    case 3:
      return d.experience !== "";
    case 4:
      return d.budget !== "";
    case 5:
      return d.timeCommitment !== "";
    default:
      return true;
  }
}

export default function ApplyForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ApplyFormData>(EMPTY_APPLY_FORM);
  const [hydrated, setHydrated] = useState(false);
  const [attemptedContactNext, setAttemptedContactNext] = useState(false);
  const [submission, setSubmission] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const dataRef = useRef(data);
  const submissionRef = useRef(submission);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    submissionRef.current = submission;
  }, [submission]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.data) setData({ ...EMPTY_APPLY_FORM, ...saved.data });
        if (typeof saved?.step === "number") {
          setStep(Math.min(Math.max(saved.step, 1), TOTAL_APPLY_STEPS));
        }
      }
    } catch {
      // localStorage unavailable, start from a blank form
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }));
    } catch {
      // ignore, the draft just won't persist for this viewer
    }
  }, [step, data, hydrated]);

  function clearDraft() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  function updateField<K extends keyof ApplyFormData>(key: K, value: ApplyFormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function submitLead(payload: ApplyFormData) {
    if (submissionRef.current === "sent") return;
    setSubmission("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      if (res.ok) {
        setSubmission("sent");
        clearDraft();
      } else {
        setSubmission("error");
      }
    } catch {
      setSubmission("error");
    }
  }

  function goNext() {
    setStep((s) => {
      const next = Math.min(s + 1, TOTAL_APPLY_STEPS);
      if (s === 5 && submissionRef.current !== "sent") void submitLead(dataRef.current);
      return next;
    });
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function selectAndAdvance<K extends keyof ApplyFormData>(key: K, value: string) {
    updateField(key, value as ApplyFormData[K]);
    setTimeout(goNext, 200);
  }

  if (!hydrated) {
    return (
      <StepShell step={1} totalSteps={TOTAL_APPLY_STEPS} title={STEP_TITLES[1]}>
        <div className="h-[220px]" />
      </StepShell>
    );
  }

  return (
    <StepShell
      step={step}
      totalSteps={TOTAL_APPLY_STEPS}
      title={STEP_TITLES[step]}
      onBack={step > 1 ? goBack : undefined}
    >
      {step === 1 && (
        <ContactStep
          data={data}
          onChange={updateField}
          attempted={attemptedContactNext}
          onNext={() => {
            setAttemptedContactNext(true);
            if (isStepValid(1, data)) goNext();
          }}
        />
      )}
      {step === 2 && (
        <SingleSelectStep
          options={PAIN_POINT_OPTIONS}
          value={data.painPoint}
          onSelect={(v) => selectAndAdvance("painPoint", v)}
        />
      )}
      {step === 3 && (
        <SingleSelectStep
          options={EXPERIENCE_OPTIONS}
          value={data.experience}
          onSelect={(v) => selectAndAdvance("experience", v)}
        />
      )}
      {step === 4 && (
        <SingleSelectStep
          options={BUDGET_OPTIONS}
          value={data.budget}
          onSelect={(v) => selectAndAdvance("budget", v)}
        />
      )}
      {step === 5 && (
        <SingleSelectStep
          options={TIME_OPTIONS}
          value={data.timeCommitment}
          onSelect={(v) => selectAndAdvance("timeCommitment", v)}
        />
      )}
      {step === 6 && <BookingStep fullName={data.fullName} email={data.email} />}
    </StepShell>
  );
}
