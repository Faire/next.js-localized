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

/**
 * A link that switches the locale when clicked.
 *
 * This component only needs to be used when you want to switc the locale, otherwise you can use a normal Link component.
 */
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
