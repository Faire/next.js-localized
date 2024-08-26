import "server-only";
import { getIntl } from "@/lib/dictionary";
import { getLocaleHeader } from "@/lib/headers";
import { IntlShape } from "@formatjs/intl";

type FormatMessage = IntlShape<string>["formatMessage"];

export const serverSideLocalize = (...args: Parameters<FormatMessage>) => {
  const locale = getLocaleHeader();
  return getIntl(locale).formatMessage(...args);
};
