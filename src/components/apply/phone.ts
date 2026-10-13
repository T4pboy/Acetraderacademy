// iClosed only accepts phone numbers that carry a "+" country code.
export function isPhoneWithCountryCode(phone: string) {
  const trimmed = phone.trim();
  return trimmed.startsWith("+") && /^\+[\d\s().-]+$/.test(trimmed) && trimmed.replace(/\D/g, "").length >= 8;
}
