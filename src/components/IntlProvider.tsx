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
    // Since our messages are inserted at build-time in place of the existing defaultMessage,
    // we don't want to pass any messsages here when running in the browser.
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

  // When running on the server, we can pass the real messages read from the dictionary
  // files to the ReactIntlProvider, without passing the entire dictionary to the browser.
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
