import shrinkRayCompression from "shrink-ray-current";
import express from "express";
import next from "next";
import { withLocalization } from "@/server/withLocalization";

const isProduction = process.env.NODE_ENV === "production";

const app = express();
const nextApp = next({ dev: !isProduction });

const handle = withLocalization(nextApp.getRequestHandler(), {
  enabled: isProduction,
});

app.use(
  shrinkRayCompression({
    useZopfliForGzip: false,
  } as Parameters<typeof shrinkRayCompression>[0])
);
app.use((req, res) => handle(req, res));

const port = process.env.PORT ?? 3000;

nextApp.prepare().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server is ready on port ${port}!`);
  });
});
