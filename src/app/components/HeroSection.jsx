"use client";

import React, { useRef, useState, useEffect } from "react";

export default function HeroSection() {
  const [isFadingOut, setIsFadingOut] = useState(false); // Controla el fade-out
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    // Activa el fade-out hacia el final del video
    setIsFadingOut(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0; // Reinicia el video
        videoRef.current.play(); // Reproduce de nuevo
        setIsFadingOut(false); // Reactiva el fade-in
      }
    }, 500); // Pausa corta para suavizar la transición
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd} // Detecta el final del video
      >
        <source src="/videos/dron_fpv_facultad_derecho_pago.mp4" type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>

      {/* Capa de superposición */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          isFadingOut ? "bg-opacity-70" : "bg-opacity-50"
        }`}
      ></div>

      {/* Contenido del Hero */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-16 flex flex-col items-start min-h-screen justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-2xl">
          Gestión de proyectos públicos y/o privados
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 max-w-3xl lg:max-w-4xl leading-tight">
        Brindamos asesoramiento integral en gestión de proyectos constructivos y ejecución de contrataciones públicas y/o privadas.
      </p>

      </div>
    </div>
  );
}
