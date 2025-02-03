"use client";

import React, { useRef, useState, useEffect } from "react";
// 1. Importa useTranslation
import { useTranslation } from '../TranslationProvider';

export default function HeroSection() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef(null);

  // 2. Extrae la función t()
  const { t } = useTranslation();

  const handleVideoEnd = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsFadingOut(false);
      }
    }, 500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        ref={videoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      >
        <source
          src="/videos/dron_fpv_facultad_derecho_pago.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta el tag de video.
      </video>

      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          isFadingOut ? "bg-opacity-70" : "bg-opacity-50"
        }`}
      ></div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-16 flex flex-col items-start min-h-screen justify-center">
        {/* 3. Reemplaza textos duros por t("hero","title") y t("hero","subtitle") */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-2xl">
          {t("hero", "title")}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 max-w-3xl lg:max-w-4xl leading-tight">
          {t("hero", "subtitle")}
        </p>
      </div>
    </div>
  );
}
