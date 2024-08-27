import "server-only";
import { headers } from "next/headers";
import { getLocaleFromString, Locale, localeHeader } from "@/lib/locale";

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
