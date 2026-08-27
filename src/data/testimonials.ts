export type Testimonial = {
  id: string;
  name: string;
  caption: string;
  metric: string;
  /** Path to the real screenshot/photo. Omit to render the placeholder frame. */
  imageSrc?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "roh",
    name: "Roh",
    caption: "Passed my second 25k account in 2 weeks.",
    metric: "2ND 25K ACCOUNT PASSED",
    imageSrc: "/testimonials/roh.jpeg",
  },
  {
    id: "isaac",
    name: "Isaac",
    caption: "13 hours long trade in the bag.",
    metric: "13-HOUR TRADE",
    imageSrc: "/testimonials/isaac.jpeg",
  },
  {
    id: "emmanuel",
    name: "Emmanuel",
    caption: "Consistent profitability.",
    metric: "$940 APEX PAYOUT",
    imageSrc: "/testimonials/emmanuel.jpeg",
  },
  {
    id: "zee",
    name: "Zee",
    caption: "Caught this banger the same night I activated the account — and passed it in 1 trade. Biggest win so far!",
    metric: "PASSED IN 1 TRADE",
    imageSrc: "/testimonials/zee.jpeg",
  },
  {
    id: "group-session",
    name: "Group Coaching Session",
    caption: "Inside a live A.C.E. Method group call — real charts, real-time breakdowns.",
    metric: "LIVE GROUP CALL",
    imageSrc: "/testimonials/group-session.jpeg",
  },
];
