import { defaultLocale, getLocaleFromPathname, Locale } from "@/lib/locale";
import type { RequestHandler } from "next/dist/server/next";
import type { IncomingMessage, ServerResponse } from "node:http";

const decoder = new TextDecoder();

const transformChunkWithLocale = (
  locale: Locale | undefined,
  chunk: string | ArrayBuffer
): string => {
  const content = typeof chunk === "string" ? chunk : decoder.decode(chunk);
  // matches static/chunks/.../.../*.js
  return content.replace(
    /(static\/chunks\/(?:[^"\s]+\/)*[^/\s]+)(\.js)/g,
    (_, p1, p2) => {
      return `${p1}.${locale}${p2}`;
    }
  );
};

const patchStream = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  locale: Locale
) => {
  const originalWrite = res.write;
  res.write = (...params) => {
    const [chunk, ...rest] = params;
    if (!isNextAssetRequest(req)) {
      const transformedChunk = transformChunkWithLocale(locale, chunk);
      return originalWrite.call(
        res,
        ...([transformedChunk, ...rest] as Parameters<typeof res.write>)
      );
    } else {
      return originalWrite.call(
        res,
        ...(params as Parameters<typeof res.write>)
      );
    }
  };
};

export const isNextAssetRequest = (req: IncomingMessage) => {
  return req.url?.startsWith("/_next") || req.url?.startsWith("/__nextjs");
};

export const withLocalization = (
  handler: RequestHandler,
  {
    enabled,
  }: {
    enabled: boolean;
  }
): RequestHandler => {
  if (!enabled) {
    return handler;
  }

  return (req, res, parsedUrl) => {
    let locale = getLocaleFromPathname(req.url) ?? defaultLocale;
    if (locale !== defaultLocale) {
      patchStream(req, res, locale);
    }
    return handler(req, res, parsedUrl);
  };
};
