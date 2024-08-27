import "server-only";
import type { IntlShape } from "@formatjs/intl";
import { getIntl } from "@/lib/dictionary";
import { getLocaleHeader } from "@/lib/headers";

type FormatMessage = IntlShape<string>["formatMessage"];

export const serverSideLocalize = (...args: Parameters<FormatMessage>) => {
  const locale = getLocaleHeader();
  return getIntl(locale).formatMessage(...args);
};
