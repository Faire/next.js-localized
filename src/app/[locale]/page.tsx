import Image from "next/image";
import { ClientComponent } from "@/components/ClientComponent";
import { defaultLocale, locales } from "@/lib/locale";
import { serverSideLocalize } from "@/lib/serverSideLocalize";
import { LocaleSwitchLink } from "@/components/LocaleSwitchLink";
import "./page.css";

export default function Home() {
  return (
    <main className="main">
      <a href="https://github.com/Faire" className="logo" target="_blank">
        <Image
          src="https://cdn.faire.com/static/logo.svg"
          alt="Faire Logo"
          width={312}
          height={39}
        />
      </a>
      <h1>Next.js Localization Starter Kit</h1>
      <div className="divider" />
      <div className="text-container">
        <span>
          This code is designed as a starting point for performant localization
          in Next.js. <br /> In particular, it leverages build-time splitting of
          translated strings to avoid shipping unnecessary translations to
          browsers.
        </span>
        <span>
          For more information about how this localization design works, see the
          README.
        </span>
        <span>
          For more information about how we leverage this technology at Faire,
          see our blog post!
        </span>
      </div>
      <div className="divider" />
      <div className="text-container">
        <span>
          {serverSideLocalize({
            id: "server.inline.message",
            defaultMessage: `[${defaultLocale}] Server inline message!`,
          })}
        </span>
        <ClientComponent />
      </div>
      <div className="divider" />
      <div className="text-container">
        <span>
          To see the localization for yourself, visit one of the available
          locales below (will <strong>not</strong> work in development mode):
        </span>
        <div className="nav">
          {locales.map((locale) => (
            <LocaleSwitchLink key={locale} locale={locale} className="link">
              Visit {locale}
            </LocaleSwitchLink>
          ))}
        </div>
      </div>
    </main>
  );
}
