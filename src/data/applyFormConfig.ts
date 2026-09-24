export type ApplyOption = { value: string; label: string };

export type ApplyFormData = {
  email: string;
  fullName: string;
  phone: string;
  painPoint: string;
  experience: string;
  budget: string;
  timeCommitment: string;
};

export const EMPTY_APPLY_FORM: ApplyFormData = {
  email: "",
  fullName: "",
  phone: "",
  painPoint: "",
  experience: "",
  budget: "",
  timeCommitment: "",
};

export const TOTAL_APPLY_STEPS = 6;

export const PAIN_POINT_OPTIONS: ApplyOption[] = [
  { value: "no-consistency", label: "No consistency in my trading" },
  { value: "lack-of-strategy", label: "Lack of strategy or clear entries" },
  { value: "funding-failures", label: "Failing funded/prop firm challenges" },
];

export const EXPERIENCE_OPTIONS: ApplyOption[] = [
  { value: "brand-new", label: "Brand new to trading" },
  { value: "some-experience", label: "Some experience" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const BUDGET_OPTIONS: ApplyOption[] = [
  { value: "under-500", label: "Under $500" },
  { value: "500-1999", label: "$500-$1,999" },
  { value: "2000-4999", label: "$2,000-$4,999" },
  { value: "5000-plus", label: "$5,000+" },
];

export const TIME_OPTIONS: ApplyOption[] = [
  { value: "under-3", label: "Less than 3 hours a week" },
  { value: "3-4", label: "3-4 hours a week" },
  { value: "5-9", label: "5-9 hours a week" },
  { value: "10-plus", label: "10+ hours a week" },
];
