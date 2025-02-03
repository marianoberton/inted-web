"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building,
  Briefcase,
  PenLine,
  Ruler,
  Hammer,
  HardHat,
  Home,
  Layers,
  FileCheck,
} from "lucide-react";

// 1. Importa useTranslation
import { useTranslation } from "../TranslationProvider";

// Mapeo de iconos
const Icons = {
  Building,
  Briefcase,
  PenLine,
  Ruler,
  Hammer,
  HardHat,
  Home,
  Layers,
  FileCheck,
};

export default function CircularServiceShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 2. Leemos del diccionario "proyectosConstructivos" > "circleTitle" y "circleServices"
  const { t } = useTranslation();
  const circleTitle = t("proyectosConstructivos", "circleTitle");
  const circleServices = t("proyectosConstructivos", "circleServices");

  // Si no es un array, lo convertimos en uno vacío para evitar errores
  const servicesArray = Array.isArray(circleServices) ? circleServices : [];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % servicesArray.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, servicesArray.length]);

  const getIconPosition = (index) => {
    const totalItems = servicesArray.length;
    const angle = (index / totalItems) * 2 * Math.PI - Math.PI / 2;
    const radius = isMobile ? 140 : 280;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div className="relative container mx-auto py-16 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white px-4">
      <h2 className="text-4xl font-bold mb-12 text-center text-[#1b293f]">
        {circleTitle}
      </h2>

      <div
        className={`relative flex items-center justify-center ${
          isMobile ? "w-[300px] h-[300px]" : "w-[640px] h-[640px]"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Círculo exterior decorativo */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
        <div className="absolute inset-[20px] rounded-full border border-gray-100"></div>

        {/* Íconos alrededor */}
        {servicesArray.map((service, index) => {
          const { x, y } = getIconPosition(index);
          const Icon = Icons[service.icon] || FileCheck;

          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`absolute flex items-center justify-center rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-[#1B293F] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-[#1B293F] hover:text-white"
              }`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                width: isMobile ? "42px" : "64px",
                height: isMobile ? "42px" : "64px",
                border: isMobile ? "2px solid #E5E7EB" : "none",
              }}
            >
              <Icon
                className={`${
                  isMobile ? "w-5 h-5" : "w-6 h-6"
                } transition-colors`}
              />
            </button>
          );
        })}

        {/* Contenido Central */}
        <div
          className={`absolute rounded-full bg-[#1B293F] shadow-lg flex items-center justify-center overflow-hidden text-white ${
            isMobile ? "inset-[40px]" : "inset-[80px]"
          }`}
          style={{ zIndex: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center p-4 md:p-6"
            >
              <h3
                className={`${
                  isMobile ? "text-base" : "text-xl"
                } font-semibold mb-2 md:mb-4`}
              >
                {servicesArray[currentIndex]?.title}
              </h3>
              {!isMobile && (
                <p className="text-sm">
                  {servicesArray[currentIndex]?.content}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
