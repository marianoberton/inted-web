"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

// 1. Importamos useTranslation
import { useTranslation } from "../TranslationProvider";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [status, setStatus] = useState("");

  // 2. Extraemos t() para traducir
  const { t } = useTranslation();

  // 3. Obtenemos texto del diccionario
  const pageTitle = t("contact", "pageTitle");
  const formTitle = t("contact", "formTitle");
  const namePlaceholder = t("contact", "namePlaceholder");
  const emailPlaceholder = t("contact", "emailPlaceholder");
  const phonePlaceholder = t("contact", "phonePlaceholder");
  const messagePlaceholder = t("contact", "messagePlaceholder");
  const sendButton = t("contact", "sendButton");
  const statusSending = t("contact", "statusSending");
  const statusSuccess = t("contact", "statusSuccess");
  const statusError = t("contact", "statusError");

  const contactInfoTitle = t("contact", "contactInfoTitle");
  const addressTitle = t("contact", "addressTitle");
  const addressLine1 = t("contact", "addressLine1");
  const addressLine2 = t("contact", "addressLine2");
  const addressLine3 = t("contact", "addressLine3");
  const locationTitle = t("contact", "locationTitle");
  const mapIframeSrc = t("contact", "mapIframeSrc");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(statusSending); // "Enviando..." o "Sending..."

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus(statusSuccess);
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          mensaje: "",
        });
      } else {
        setStatus(statusError);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setStatus(statusError);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-8 md:pb-16"
      >
        {/* Título principal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[#1b293f] mb-8 md:mb-16">
          {pageTitle}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#1b293f] mb-6">
              {formTitle}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="nombre"
                placeholder={namePlaceholder}
                value={formData.nombre}
                onChange={handleChange}
                required
                className="text-gray-900 placeholder-gray-500"
              />
              <Input
                type="email"
                name="email"
                placeholder={emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
                required
                className="text-gray-900 placeholder-gray-500"
              />
              <Input
                type="tel"
                name="telefono"
                placeholder={phonePlaceholder}
                value={formData.telefono}
                onChange={handleChange}
                className="text-gray-900 placeholder-gray-500"
              />
              <Textarea
                name="mensaje"
                placeholder={messagePlaceholder}
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows={5}
                className="text-gray-900 placeholder-gray-500"
              />
              <Button
                type="submit"
                className="w-full bg-[#1b293f] text-white hover:bg-[#2a3b5a]"
              >
                {sendButton}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
            {status && (
              <p className="text-center text-gray-600 mt-4">{status}</p>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#1b293f] text-white rounded-lg shadow-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">
              {contactInfoTitle}
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-gray-300 mt-1" />
                <div>
                  <h3 className="font-semibold">{addressTitle}</h3>
                  <p>{addressLine1}</p>
                  <p>{addressLine2}</p>
                  <p>{addressLine3}</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">{locationTitle}</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={mapIframeSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
