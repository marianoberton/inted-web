import { MetadataRoute } from "next";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://inted.com.ar/sitemap.xml",
    host: "https://inted.com.ar",
  };
}
