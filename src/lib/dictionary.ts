import fs from "fs";
import { MessageFormatElement } from "react-intl";
import { createIntl, IntlShape } from "@formatjs/intl";
import { defaultLocale, Locale } from "@/lib/locale";

type Dictionary =
  | Record<string, MessageFormatElement[]>
  | Record<string, string>;

export const getDictionary = (locale: Locale) => {
  if (locale === defaultLocale) {
    return {};
  }
  if (dictionaryCache.has(locale)) {
    return dictionaryCache.get(locale)!;
  }
  const filename = `./dictionaries/${locale}.json`;

  try {
    const dictionary = JSON.parse(fs.readFileSync(filename, "utf8"));
    dictionaryCache.set(locale, dictionary);
    return dictionary as Dictionary;
  } catch (e) {
    throw new Error(
      `Failed to read translation file for ${locale}. File pathname=${filename}. Error=${e}`
    );
  }
};

export const getIntl = (locale: Locale) => {
  if (intlCache.has(locale)) {
    return intlCache.get(locale)!;
  }
  const intl = createIntl({
    locale,
    messages: getDictionary(locale),
    defaultLocale,
  });
  intlCache.set(locale, intl);
  return intl;
};

const dictionaryCache = new Map<Locale, Dictionary>();
const intlCache = new Map<Locale, IntlShape>();
