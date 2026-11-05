import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js/min";

// iClosed only accepts numbers in international format with at least 10 digits
// in total. We normalise everything to E.164 (e.g. +2348012345678) using
// libphonenumber, which knows each country's trunk prefixes and lengths.

/** Parse a number typed with a "+" country code, or a national number for `country`. */
function parse(raw: string, country?: CountryCode) {
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith("+")
    ? parsePhoneNumberFromString(trimmed)
    : parsePhoneNumberFromString(trimmed, country);
}

/** Returns the E.164 number (e.g. "+442071838750") or null if it isn't usable. */
export function toE164(raw: string, country?: CountryCode): string | null {
  const parsed = parse(raw, country);
  if (!parsed || !parsed.isPossible()) return null;
  const e164 = parsed.number;
  return e164.replace(/\D/g, "").length >= 10 ? e164 : null;
}

export function isPhoneWithCountryCode(phone: string) {
  return toE164(phone) !== null;
}

export type CountryOption = { code: CountryCode; name: string; dial: string };

export function getCountryOptions(): CountryOption[] {
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  return getCountries()
    .map((code) => ({ code, name: names.of(code) ?? code, dial: getCountryCallingCode(code) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Best guess of the visitor's country from the browser locale. */
export function guessCountry(): CountryCode {
  try {
    const region = new Intl.Locale(navigator.language).maximize().region;
    if (region && getCountries().includes(region as CountryCode)) return region as CountryCode;
  } catch {
    // fall through
  }
  return "US";
}

/** Split a stored number back into country + national digits (for the Back button). */
export function splitStored(phone: string): { country?: CountryCode; national: string } {
  const parsed = phone ? parsePhoneNumberFromString(phone) : undefined;
  if (parsed?.country) return { country: parsed.country, national: parsed.nationalNumber };
  return { national: phone };
}
