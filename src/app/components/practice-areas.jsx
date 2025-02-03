"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  PenLine,
  HardHat,
  ArrowRight,
  FileEdit,
  ClipboardList,
  Building,
} from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "../TranslationProvider";

function ServiceIcon({ icon: Icon, title }) {
  return (
    <div className="flex items-center text-white">
      <div className="bg-white/20 p-2 rounded-full flex items-center justify-center w-10 h-10 flex-shrink-0">
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <span className="text-sm ml-4">{title}</span>
    </div>
  );
}

function PracticeArea({ title, image, link, services, verMasText }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl shadow-2xl group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-96 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-300 group-hover:justify-end">
        <h3 className="text-3xl font-bold text-white mb-4 text-center transition-all duration-300 group-hover:mb-8">
          {title}
        </h3>
        <div className="hidden group-hover:flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
          <AnimatePresence>
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="w-full"
              >
                <ServiceIcon {...service} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: services.length * 0.1 }}
          className="hidden group-hover:block mt-6"
        >
          <Link href={link} passHref>
            <Button className="bg-white text-black hover:bg-gray-200 transition-colors duration-300">
              {verMasText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function PracticeAreas() {
  const { t } = useTranslation();

  const practiceAreas = [
    {
      title: t("practiceAreas", "area1"),
      image: "/images/1678385453066.jpg",
      link: "/consultoria-licitaciones",
      services: [
        {
          icon: FileEdit,
          title: t("practiceAreas", "services").elaboracionOfertas,
        },
        {
          icon: Briefcase,
          title: t("practiceAreas", "services").ejecucionProyecto,
        },
        {
          icon: ClipboardList,
          title: t("practiceAreas", "services").gestionProcedimientos,
        },
      ],
    },
    {
      title: t("practiceAreas", "area2"),
      image: "/images/pexels-photo-3525541.jpeg",
      link: "/proyectos-constructivos",
      services: [
        {
          icon: PenLine,
          title: t("practiceAreas", "services").planoEtapa,
        },
        {
          icon: Building,
          title: t("practiceAreas", "services").planosInstalaciones,
        },
        {
          icon: HardHat,
          title: t("practiceAreas", "services").portalDirector,
        },
      ],
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-[#1b293f] mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t("practiceAreas", "heading")}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {practiceAreas.map((area, index) => (
            <PracticeArea
              key={index}
              {...area}
              // 1. Pasamos el texto "ver más" como prop
              verMasText={t("practiceAreas", "verMas")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
