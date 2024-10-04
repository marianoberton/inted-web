import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const articles = [
  {
    id: 1,
    title: "Nuevas Regulaciones en Contrataciones Públicas",
    excerpt: "El gobierno anuncia cambios en las normativas que rigen las contrataciones con el estado, buscando mayor transparencia y eficiencia en los procesos.",
    date: "15 de septiembre de 2024",
    author: "Matias Estevez",
    image: "/images/novedades1.jpg",
    slug: "nuevas-regulaciones-contrataciones-publicas"
  },
  {
    id: 2,
    title: "Digitalización de Procesos Licitatorios",
    excerpt: "Se implementa una plataforma digital para agilizar y modernizar los procesos de licitación, permitiendo una participación más amplia de empresas.",
    date: "10 de septiembre de 2024",
    author: "Facundo Severio",
    image: "/images/novedades2.jpg",
    slug: "digitalizacion-procesos-licitatorios"
  }
];

export default function NovedadesPage() {
  return (
    <div className="bg-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Título de la página */}
        <h1 className="text-4xl font-bold text-[#1b293f] mb-8 text-center">Novedades</h1>

        {/* Grid de artículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map(article => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-56">
                <Image
                  src={article.image}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#1b293f] mb-2">{article.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{article.date} | Por {article.author}</p>
                <p className="text-gray-700 mb-4">{article.excerpt}</p>
                <Link href={`/novedades/${article.slug}`} className="text-[#1b293f] hover:underline font-semibold">
                  Leer más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
