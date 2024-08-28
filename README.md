# Faire's Next.js Localization Starter Kit

This repo is designed as a starting point for performant localization
in Next.js.

## Features

- **Build-time splitting of translations**: Translations are split into
	separate files at build time, so that only the necessary translations
	are shipped to the browser.
- **Server and client side formatting**: Translations can occur both in server and client components.
- **Fully customizable locale structure**: You can define your own list of locales in [`locale.ts`](src/lib/locale.ts) and the [`dictionaries`](dictionaries) directory, and the build script will automatically generate the necessary files.

## Getting Started

First, run the development server:

```bash
yarn dev # to run the native Next.js dev server (recommended)
# or
yarn dev:server # to run the custom express server that handles localizing chunk output (slower)
```

Open [`http://localhost:3000`](http://localhost:3000) with your browser to see the result!
Note that localization does not work in development mode, as the build script is not run. For more information, see the [FAQs](#faqs).

## Production build

To enable localization for the app, it must be run as a production build. To do this, run:

```bash
yarn build
yarn start
```

## FAQs

### Why doesn't localization work in development mode?

Localization is a build-time process, and the build script is not run in development mode. This is because Next.js automatically recreates the .next folder in development mode, so running the script to create the localized chunks would not work.

In theory, localization would still work for server-rendered translations as they read
directly from the dictionaries, but this is omitted to prevent confusion as to why some
messages are not translated.

### How can I add or change the accepted locales?

You can define your own list of locales in [`locale.ts`](src/lib/locale.ts), along with a default locale. Once you have done so, be sure to include all of your dictionary JSON files in the [`dictionaries`](dictionaries) directory (except for your default locale), and the build script will automatically generate the necessary files.

### Do I need to use `LocaleSwitchLink` for every link in my app?

No, you only need to use LocaleSwitchLink when you want to change between locales (for instance, redirecting from /en-US to /fr-FR). For links that should stay within the same locale, you can use Next.js's built-in `Link` component.

### How can I access the current locale in my components?

In server components, you can use [`getLocaleHeader`](src/lib/headers.ts). For client components, you can use the `useIntl` hook from react-intl.
