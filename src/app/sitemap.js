import { MetadataRoute } from "next";

export default function sitemap() {
  return [
    {
      url: "https://inted.com.ar/",
      lastModified: new Date().toISOString(),
      priority: 1.0,
    },
    {
      url: "https://inted.com.ar/quienes-somos",
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },
    {
      url: "https://inted.com.ar/licitaciones",
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },
    {
      url: "https://inted.com.ar/proyectos-constructivos",
      lastModified: new Date().toISOString(),
      priority: 0.7,
    },
    {
      url: "https://inted.com.ar/portal-licitaciones",
      lastModified: new Date().toISOString(),
      priority: 0.7,
    },
    {
      url: "https://inted.com.ar/contacto",
      lastModified: new Date().toISOString(),
      priority: 0.6,
    },
  ];
}
