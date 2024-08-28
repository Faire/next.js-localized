import { localeHeader } from "@/lib/headers";
import {
  defaultLocale,
  getLocaleFromPathname,
  removeLocaleFromPathname,
} from "@/lib/locale";
import { NextResponse, type NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const { headers } = request;
  let { pathname } = request.nextUrl;

  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    // We remove the locale from the pathname in development, to ensure it is always set to the default locale in the next step.
    pathname = removeLocaleFromPathname(pathname);
  }

  const locale = getLocaleFromPathname(pathname);
  // We set the value of locale to a header, so that we can access it in server components.
  headers.set(localeHeader, locale ?? defaultLocale);

  if (!locale) {
    // If there isn't an explicit locale in the URL, we rewrite to the default locale.
    // Depending on your needs, you might want to change this to rewrite to the users' preferred locale, or do a redirect instead.
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(newUrl, { request: { headers } });
  }
  return NextResponse.next({ request: { headers } });
};

// Don't match static files, as they don't need to be rewritten with the locale attached.
export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
