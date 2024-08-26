import {
  defaultLocale,
  getLocaleFromPathname,
  localeHeader,
  removeLocaleFromPathname,
} from "@/lib/locale";
import { NextResponse, type NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const { headers } = request;
  let { pathname } = request.nextUrl;

  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    pathname = removeLocaleFromPathname(pathname);
  }

  const locale = getLocaleFromPathname(pathname);
  headers.set(localeHeader, locale ?? defaultLocale);

  if (!locale) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(newUrl, { request: { headers } });
  }
  return NextResponse.next({ request: { headers } });
};

export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
