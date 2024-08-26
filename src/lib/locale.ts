export const locales = [
  "da-DK",
  "de-DE",
  "en-GB",
  "en-US",
  "es-ES",
  "fr-FR",
  "it-IT",
  "nl-NL",
  "pt-PT",
  "sv-SE",
] as const;

export const defaultLocale = "en-US";

export const localeHeader = "x-locale";

export const localeSet = new Set(locales);

export type Locale = (typeof locales)[number];

export const getLocaleFromPathname = (
  pathname: string | undefined | null
): Locale | undefined => {
  return getLocaleFromString(pathname?.split("/")[1]);
};

export const getLocaleFromString = (
  locale: string | undefined | null
): Locale | undefined => {
  const localeSegments = locale?.split("-");
  if (!localeSegments || !localeSegments[0] || !localeSegments[1]) {
    return undefined;
  }
  const transformedLocale = `${localeSegments[0].toLowerCase()}-${localeSegments[1].toUpperCase()}`;
  if (localeSet.has(transformedLocale as Locale)) {
    return transformedLocale as Locale;
  }
  return undefined;
};

export const removeLocaleFromPathname = (url: string): string => {
  const locale = getLocaleFromPathname(url);
  if (!locale) {
    return url;
  }
  return url.split("/").slice(2).join("/");
};
