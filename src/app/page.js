import React from 'react';
import Head from 'next/head';
import HeroSection from "./components/HeroSection.jsx";
import CompanyOverview from './components/company-overview';
import TenderPreview from './components/TenderData'; 
import PracticeAreas from './components/practice-areas.jsx';

export default function Home() {
  return (
    <>
      <Head>
        {/* Título optimizado con palabras clave */}
        <title>Consultoría en Licitaciones y Contrataciones con el Estado | Proyectos Constructivos</title>

        {/* Meta descripción SEO */}
        <meta name="description" content="Somos expertos en licitaciones y contrataciones con el Estado. Brindamos consultoría en procesos administrativos y proyectos constructivos para empresas privadas." />

        {/* Palabras clave SEO */}
        <meta name="keywords" content="
          licitaciones, contrataciones con el Estado, consultoría, proyectos constructivos, 
          procesos administrativos, asesoría empresarial, convenio marco, compras y contrataciones, 
          bac, buenos aires compras, contratación menor, portal de obra, licitaciones caba, 
          licitaciones gcba, licitaciones ministerio, concesiones, habilitaciones, planos de obra, 
          registro de obra, portal director de obra, 
          gestión de licitaciones, asesoría en compras públicas, ejecución de contratos públicos, 
          concesiones estatales, permisos de obra, plano de obra civil, desarrollo de proyectos constructivos, 
          gestión de contratos públicos, compras y contrataciones gubernamentales, 
          procesos licitatorios en Argentina, planificación de proyectos constructivos, 
          financiamiento de obras públicas, cómo participar en una licitación, 
          director de obra Argentina, empresas constructoras en licitaciones, contratación con el Estado argentino.
        "/>

        {/* Autor */}
        <meta name="author" content="Inted" />

        {/* Meta robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Open Graph para redes sociales (Facebook, LinkedIn, WhatsApp) */}
        <meta property="og:title" content="Consultoría en Licitaciones y Contrataciones con el Estado | Proyectos Constructivos" />
        <meta property="og:description" content="Brindamos asesoría en licitaciones públicas, contratación con el Estado y desarrollo de proyectos constructivos para empresas privadas." />
        <meta property="og:image" content="https://inted.com.ar/images/azul1.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://inted.com.ar" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Consultoría en Licitaciones y Contrataciones con el Estado | Proyectos Constructivos" />
        <meta name="twitter:description" content="Brindamos asesoría en licitaciones públicas, contratación con el Estado y desarrollo de proyectos constructivos para empresas privadas." />
        <meta name="twitter:image" content="https://inted.com.ar/images/azul1.png" />
        <meta name="twitter:image:alt" content="Consultoría en licitaciones y contrataciones con el Estado" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Datos estructurados JSON-LD para Google */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "INTED Consultoría",
            "url": "https://inted.com.ar",
            "logo": "https://inted.com.ar/images/azul1.png",
            "description": "Consultoría en licitaciones, contrataciones con el Estado y Desarrollo de Proyectos Constructivos.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Juramento 1475",
              "addressLocality": "Ciudad Autónoma de Buenos Aires",
              "addressCountry": "Argentina"
            },
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+54-XXX-XXX-XXXX",
                "contactType": "Consultoría"
              }
            ],
            "sameAs": [
              "https://www.linkedin.com/company/inted",
              "https://twitter.com/inted",
              "https://www.facebook.com/inted"
            ]
          })}
        </script>
      </Head>

      <main>
        <HeroSection />
        <CompanyOverview />
        <PracticeAreas />
        <TenderPreview />
      </main>
    </>
  );
}
