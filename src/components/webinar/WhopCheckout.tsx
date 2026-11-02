"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { isPlaceholderValue, KIT } from "@/data/webinar";
import GoldButton from "./GoldButton";

/**
 * Whop embedded checkout for the $21 kit. After purchase Whop sends the buyer to the return path.
 * Renders a dashed placeholder until KIT.whopPlanId is a real plan ID.
 */
export default function WhopCheckout({ returnPath }: { returnPath: string }) {
  const [returnUrl, setReturnUrl] = useState("");
  useEffect(() => setReturnUrl(`${window.location.origin}${returnPath}`), [returnPath]);

  if (isPlaceholderValue(KIT.whopPlanId)) {
    return (
      <div className="mx-auto flex max-w-[560px] flex-col items-center gap-3 py-4 text-center">
        <GoldButton href={KIT.checkoutUrl} external>
          Get My Kit For ${KIT.price}
        </GoldButton>
        <p className="text-[12.5px] text-slate-500">Secure checkout on Whop</p>
      </div>
    );
  }

  return (
    <>
      <Script src="https://js.whop.com/static/checkout/loader.js" strategy="afterInteractive" />
      {returnUrl && (
        <div
          data-whop-checkout-plan-id={KIT.whopPlanId}
          data-whop-checkout-return-url={returnUrl}
          data-whop-checkout-theme="light"
          className="mx-auto max-w-[560px]"
        />
      )}
    </>
  );
}
