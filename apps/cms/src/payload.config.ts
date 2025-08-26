import { buildConfig } from "payload/config";

export default buildConfig({
  serverURL: process.env.PUBLIC_SERVER_URL,
  admin: { user: "users" },
  collections: [
    {
      slug: "users",
      auth: true,
      fields: [{ name: "role", type: "text" }],
    },
    {
      slug: "articles",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "richText" },
      ],
    },
  ],
});
