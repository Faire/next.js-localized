import { IntlProvider } from "@/components/IntlProvider";
import { getLocaleHeader } from "@/lib/headers";
import type { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  const locale = getLocaleHeader();
  return <IntlProvider locale={locale}>{children}</IntlProvider>;
};
