import express from "express";
import payload from "payload";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
const PORT = Number(process.env.PORT || 3001);

(async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!,
    express: app,
    configPath: path.resolve(__dirname, "./payload.config.ts"),
  });

  app.listen(PORT, () => {
    payload.logger.info(`Payload CMS running at http://localhost:${PORT}/admin`);
  });
})();
