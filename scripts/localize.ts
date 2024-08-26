import { locales } from "@/lib/locale";
import { exec } from "child_process";
import path from "path";

const executeCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
};

const localize = async (): Promise<void> => {
  try {
    const tasks = locales.map((locale) => {
      const command = `tsx ${path.join(
        __dirname,
        "localize-locale.ts"
      )} ${locale}`;
      return executeCommand(command);
    });

    await Promise.all(tasks);
  } catch (error) {
    console.error(`Error executing tasks: ${error}`);
  }
};

localize();
