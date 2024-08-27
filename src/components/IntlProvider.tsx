"use client";

import { defaultLocale, Locale } from "@/lib/locale";
import type { ReactNode } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { getDictionary } from "@/lib/dictionary";

export const IntlProvider = ({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) => {
  if (!getIsSSR()) {
    return (
      <ReactIntlProvider
        locale={locale}
        messages={{}}
        defaultLocale={defaultLocale}
      >
        {children}
      </ReactIntlProvider>
    );
  }

  return (
    <ReactIntlProvider
      locale={locale}
      messages={getDictionary(locale)}
      defaultLocale={defaultLocale}
    >
      {children}
    </ReactIntlProvider>
  );
};

const getIsSSR = () => {
  return typeof window === "undefined";
};
