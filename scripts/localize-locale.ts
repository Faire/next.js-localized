import { defaultLocale, getLocaleFromString, locales } from "@/lib/locale";
import { transformAsync } from "@babel/core";
import * as fs from "fs";
import * as path from "path";

const ROOT_PATH = path.resolve(__dirname, "..");
const NEXT_CHUNKS_PATH = path.resolve(ROOT_PATH, ".next", "static", "chunks");

const getLocaleArg = () => {
  const args = process.argv.slice(2); // Removes the first two elements
  if (args.length < 1) {
    console.error("Usage: tsx ./scripts/localize-locale.ts <locale>");
    process.exit(1);
  }
  const localeString = args[0];
  if (!localeString) {
    console.error("Locale must be provided");
    process.exit(1);
  }
  const locale = getLocaleFromString(localeString);
  if (!locale) {
    console.error(`${locale} is not valid`);
    process.exit(1);
  }
  return locale;
};

const processFileContent = async (
  originalContent: string,
  fileName: string,
  localeSuffix: string
) => {
  if (fileName.startsWith("webpack")) {
    return originalContent.replace(/\.js/g, `.${localeSuffix}.js`);
  }

  if (!originalContent.includes("defaultMessage")) {
    return originalContent;
  }

  try {
    const code = await transformAsync(originalContent, {
      babelrc: false,
      configFile: false,
      compact: true,
      plugins: [
        [
          "@faire/babel-plugin-formatjs-localized-bundle",
          {
            translatedMessages: path.resolve(
              ROOT_PATH,
              `dictionaries/${localeSuffix}.json`
            ),
          },
        ],
      ],
    });

    if (!code?.code) {
      throw new Error("Code is undefined");
    }

    return code.code;
  } catch (error) {
    throw new Error(
      `${fileName} was unable to be transformed by @faire/babel-plugin-formatjs-localized-bundle: ${error}`
    );
  }
};

async function duplicateJSToLocaleRecursively(
  directoryPath: string,
  localeSuffix: string
) {
  try {
    const entries = await fs.promises.readdir(directoryPath, {
      withFileTypes: true,
    });
    for (let entry of entries) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) {
        await duplicateJSToLocaleRecursively(entryPath, localeSuffix);
      } else if (
        entry.isFile() &&
        entry.name.endsWith(".js") &&
        locales.every((locale) => !entry.name.endsWith(`.${locale}.js`))
      ) {
        try {
          const data = await fs.promises.readFile(entryPath, "utf8");
          const modifiedData = await processFileContent(
            data,
            entry.name,
            localeSuffix
          );
          const newFileName = entry.name.replace(".js", `.${localeSuffix}.js`);
          const newFilePath = path.join(directoryPath, newFileName);
          await fs.promises.writeFile(newFilePath, modifiedData, "utf8");
        } catch (readErr) {
          console.error(
            `${localeSuffix}, Error reading or writing file ${entry.name}:`,
            readErr
          );
        }
      }
    }
  } catch (err) {
    console.error(`${localeSuffix}, Error reading the directory:`, err);
  }
}

(async () => {
  const locale = getLocaleArg();
  console.log(`Processing for ${locale}`);
  if (locale === defaultLocale) {
    console.log(`Skipping default locale ${locale}`);
    return;
  }
  await duplicateJSToLocaleRecursively(NEXT_CHUNKS_PATH, locale);
  console.log(`All files have been processed for ${locale}`);
})();
