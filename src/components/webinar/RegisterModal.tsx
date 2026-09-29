"use client";

import { createContext, useContext, useEffect, useState } from "react";
import RegistrationForm from "./RegistrationForm";

const RegisterContext = createContext<() => void>(() => {});

/** Wrap the page once; any <RegisterButton /> inside opens the shared popup form. */
export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <RegisterContext.Provider value={() => setOpen(true)}>
      {children}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Reserve your free seat"
          className="fixed inset-0 z-[100] overflow-y-auto"
        >
          <div
            className="fixed inset-0 bg-bg-primary/60 backdrop-blur-md"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex min-h-full items-center justify-center p-4 sm:p-8">
            <RegistrationForm onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </RegisterContext.Provider>
  );
}

export function RegisterButton({ className = "" }: { className?: string }) {
  const openModal = useContext(RegisterContext);
  return (
    <button
      type="button"
      onClick={openModal}
      className={`inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-bright px-9 py-[19px] font-display text-[14.5px] font-extrabold uppercase tracking-wide text-[#04101f] shadow-[0_0_30px_rgba(255,193,56,0.35),0_10px_25px_-8px_rgba(255,193,56,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:w-auto ${className}`}
    >
      Save My Free Seat
    </button>
  );
}
