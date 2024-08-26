import "server-only";
import { getLocaleFromString, Locale, localeHeader } from "@/lib/locale";
import { headers } from "next/headers";

export const getLocaleHeader = (): Locale => {
  const localeString = headers().get(localeHeader);
  if (!localeString) {
    throw new Error(`No ${localeHeader} found in headers`);
  }
  const locale = getLocaleFromString(localeString);
  if (!locale) {
    throw new Error(`Invalid locale from header: ${localeString}`);
  }
  return locale;
};
