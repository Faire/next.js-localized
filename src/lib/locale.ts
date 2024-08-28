// All of the supported locales in the app.
// Each of these (except for defaultLocale) should have a corresponding JSON file in the dictionaries directory.
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

// The default locale. This is the locale that will be used if no other locale is explicitly set, and is also the fallback locale.
export const defaultLocale = "en-US" satisfies Locale;

export const localeSet = new Set(locales);

export type Locale = (typeof locales)[number];

/**
 * Retrieves a potential locale from a pathname.
 * @example
 * getLocaleFromPathname("/en-US") // "en-US"
 * getLocaleFromPathname("/en-US/about") // "en-US"
 * getLocaleFromPathname("/unsupported-locale/about/") // undefined
 */
export const getLocaleFromPathname = (
  pathname: string | undefined | null
): Locale | undefined => {
  return getLocaleFromString(pathname?.split("/")[1]);
};
/**
 * Converts a string to a locale if it is a valid locale (case insensitive).
 * This logic will have to be changed if you format your locales differently, for instance using underscores instead of hyphens.
 * @example
 * getLocaleFromString("en-US") // "en-US"
 * getLocaleFromString("en-us") // "en-US"
 * getLocaleFromString("unsupported-locale") // undefined
 */
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

/**
 * Removes the locale from a pathname.
 * @example
 * removeLocaleFromPathname("/en-US/about") // "/about"
 * removeLocaleFromPathname("/en-US") // "/"
 * removeLocaleFromPathname("/unsupported-locale/about/") // "/unsupported-locale/about/"
 */
export const removeLocaleFromPathname = (url: string): string => {
  const locale = getLocaleFromPathname(url);
  if (!locale) {
    return url;
  }
  return url.split("/").slice(2).join("/");
};
