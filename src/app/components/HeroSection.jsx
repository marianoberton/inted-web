import React from 'react';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/videos/drone_fpv_facultad_derecho.mp4" type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-16 flex flex-col items-start min-h-screen justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-2xl">
          Asesoría en Contrataciones Públicas
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-xl">
          Proveemos un acompañamiento especializado en todas las etapas de los procesos licitatorios, garantizando un abordaje técnico y jurídico sólido, con un enfoque transparente y ajustado a la normativa vigente.
        </p>
      </div>
    </div>
  );
}
