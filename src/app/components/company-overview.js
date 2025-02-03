"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
// 1. Importa useTranslation
import { useTranslation } from '../TranslationProvider';

export default function CompanyOverview() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut", delay: 0.3 },
    },
  };

  // 2. Extrae t()
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-[#f4f3f1]">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[#1b293f] mb-6"
            variants={textVariants}
          >
            {t("companyOverview", "heading")}
          </motion.h2>
          <motion.p
            className="text-lg text-[#1b293f] mb-6 leading-relaxed"
            variants={textVariants}
          >
            {t("companyOverview", "paragraph1")}
          </motion.p>
          <motion.p
            className="text-lg text-[#1b293f] mb-8 leading-relaxed"
            variants={textVariants}
          >
            {t("companyOverview", "paragraph2")}
          </motion.p>
          <motion.div variants={textVariants}>
            <Button
              className="bg-[#1b293f] text-white hover:bg-[#bfbfbf] hover:text-[#1b293f]"
              onClick={() => (window.location.href = '/quienes-somos')}
            >
              {t("companyOverview", "button")}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
