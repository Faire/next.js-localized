import { IntlProvider } from "@/components/IntlProvider";
import { getLocaleHeader } from "@/lib/headers";
import { localeHeader } from "@/lib/locale";
import { headers } from "next/headers";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  const locale = getLocaleHeader();
  return <IntlProvider locale={locale}>{children}</IntlProvider>;
};
