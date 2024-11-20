import React from 'react';
import HeroSection from "./components/HeroSection.jsx";
import CompanyOverview from './components/company-overview';
import TenderPreview from './components/TenderData'; 
import EnhancedScrollZoom from './components/enhanced-scroll-zoom'; // Asegúrate de que la ruta es correcta
import PracticeAreas from './components/practice-areas.jsx'; // Asegúrate de que la ruta es correcta

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CompanyOverview />
      <PracticeAreas />
      {/* <EnhancedScrollZoom /> Este es el componente corregido */}
      {/* <ServicesSummary /> */}
      <TenderPreview />
      
    </main>
  );
}
