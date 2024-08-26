"use client";

import { Locale } from "@/lib/locale";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type ReactNode,
} from "react";

type LocaleLinkProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  locale: Locale;
  children: ReactNode;
};

export const LocaleSwitchLink = forwardRef<HTMLAnchorElement, LocaleLinkProps>(
  ({ locale, children, ...rest }: LocaleLinkProps, ref) => {
    return (
      <a
        onClick={() => (window.location.href = `/${locale}`)}
        href={`/${locale}`}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
LocaleSwitchLink.displayName = "LocaleSwitchLink";
