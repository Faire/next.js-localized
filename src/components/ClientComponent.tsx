"use client";

import { defaultLocale } from "@/lib/locale";
import { FormattedMessage, useIntl } from "react-intl";

export const ClientComponent = () => {
  const intl = useIntl();
  return (
    <>
      <FormattedMessage
        id="client.component.message"
        defaultMessage={`[${defaultLocale}] Client component message!`}
      />
      <span>
        {intl.formatMessage({
          id: "client.inline.message",
          defaultMessage: `[${defaultLocale}] Client inline message!`,
        })}
      </span>
    </>
  );
};
