"use client";

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    appendDots: dots => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          cursor: "pointer"
        }}
      ></div>
    )
  };

  return (
    <div className="relative w-full h-screen">
      {/* Carrusel de Imágenes */}
      <Slider {...settings} className="w-full h-full">
        {/* Slide 1 */}
        <div className="relative w-full h-screen">
          <Image
            src="/images/imagen1.jpg"
            alt="Imagen de Edificio Corporativo"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl font-semibold mb-4">Excelencia en Licitaciones Públicas y Privadas</h1>
              <p className="text-lg max-w-xl mx-auto">
                Acompañamos a empresas y organismos públicos en cada etapa de los procesos licitatorios, asegurando un desarrollo profesional, transparente y con altos estándares de calidad.
              </p>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative w-full h-screen">
          <Image
            src="/images/imagen2.jpg"
            alt="Imagen de Proyecto Constructivo"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl font-semibold mb-4">Asesoría Integral en Proyectos Constructivos</h1>
              <p className="text-lg max-w-xl mx-auto">
                Gestionamos y facilitamos la documentación y trámites necesarios para llevar adelante proyectos constructivos, asegurando el cumplimiento normativo y la viabilidad técnica.
              </p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
