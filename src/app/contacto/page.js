"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Mensaje enviado con éxito.");
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          mensaje: "",
        });
      } else {
        setStatus("Hubo un problema al enviar el mensaje.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setStatus("Hubo un problema al enviar el mensaje.");
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[#1b293f] mb-8 md:mb-16">
          Contacto
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
              Envíanos un mensaje
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="nombre"
                placeholder="Nombre y Apellido"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="text-gray-900 placeholder-gray-500"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="text-gray-900 placeholder-gray-500"
              />
              <Input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                className="text-gray-900 placeholder-gray-500"
              />
              <Textarea
                name="mensaje"
                placeholder="Mensaje"
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
                Enviar mensaje
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
            <h2 className="text-2xl font-semibold mb-6">Información de contacto</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-gray-300 mt-1" />
                <div>
                  <h3 className="font-semibold">Dirección</h3>
                  <p>Av. Juramento 1475</p>
                  <p>Ciudad Autónoma de Buenos Aires (CABA)</p>
                  <p>Argentina</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Nuestra ubicación</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.186701394429!2d-58.45733868477193!3d-34.55229808047303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb42963ff8f35%3A0x61eb7e88bba1a7ff!2sJuramento%201475%2C%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1620930128000!5m2!1sen!2sar"
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
