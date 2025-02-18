"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Diccionario de traducciones.
const dictionary = {
  es: {
    layout: {
      title: "Inted - Consultoría y Gestión de Proyectos",
    },
    navbar: {
      quienesSomos: "Quiénes Somos",
      areasPractica: "Áreas de Práctica",
      licitaciones: "Licitaciones",
      contacto: "Contacto",
      licitacionesPublicasPrivadas: "Licitaciones Públicas y Privadas",
      proyectosConstructivos: "Desarrollo de Proyectos Constructivos",
    },
    hero: {
      title: "Gestión de proyectos públicos y privados",
      subtitle:
        "Brindamos asesoramiento integral en gestión de proyectos constructivos y ejecución de contrataciones públicas y privadas.",
    },
    companyOverview: {
      heading: "Innovación y calidad en consultoría",
      paragraph1:
        "Inted es una consultora innovadora que brinda asesoramiento integral en la gestión de proyectos constructivos y en materia de licitaciones públicas y privadas, garantizando la celeridad y eficiencia en cada etapa del proceso.",
      paragraph2:
        "Ofrecemos un amplio rango de servicios, que abarcan la gestoría de trámites constructivos y confección de ofertas para licitaciones públicas y privadas. Contamos con un equipo multidisciplinario de profesionales que combina experiencia en el ámbito público/privado.",
      button: "Ver más",
    },
    practiceAreas: {
      heading: "Áreas de Práctica",
      area1: "Licitaciones Públicas y Privadas",
      area2: "Desarrollo de Proyectos Constructivos",
      verMas: "Ver más",
      services: {
        elaboracionOfertas: "Elaboración de Ofertas e Impugnaciones",
        ejecucionProyecto: "Ejecución del Proyecto Licitado",
        gestionProcedimientos: "Gestión de Procedimientos Licitatorios",
        planoEtapa: "Plano de Etapa de Proyecto y Permiso de Obra Civil",
        planosInstalaciones: "Planos de Instalaciones",
        portalDirector: "Portal Director de Obra",
      },
    },
    tenderPreview: {
      title: "Licitaciones CABA",
      categoryLabel: "Categoría:",
      description: "Licitaciones en la categoría",
      totalLabel: "Total de Procesos de Compra Activos:",
      amountLabel: "Monto total de Procesos de Compra:",
      noDisponible: "No disponible",
      seeActiveTenders: "Ver licitaciones Activas",
      recentTenders: "Licitaciones Recientes",
      aperturaLabel: "Apertura",
      montoLabel: "Monto",
      liveDataNote:
        "",
    },
    footer: {
      quickLinks: "Enlaces Rápidos",
      location: "Ubicación",
      link1: "Licitaciones Públicas y Privadas",
      link2: "Desarrollo de Proyectos Constructivos",
      link3: "Licitaciones Activas",
      link4: "Contacto",
      yearRights: "© {year} Inted. Todos los derechos reservados.",
      developedBy: "Sitio desarrollado por Inted",
    },
    /** 
     * Sección "quienesSomos" con su array "features"
     */
    quienesSomos: {
      heroTitle: "Inted",
      heroParagraph:
        "Somos una consultora innovadora que brinda un asesoramiento integral en el ámbito de proyectos constructivos y licitaciones públicas y privadas, garantizando el cumplimiento normativo en cada etapa del proceso.",
      missionTitle: "Nuestra Misión",
      missionParagraph:
        "Acompañar a nuestros clientes a lo largo de las diversas instancias de su proyecto, desde la planificación hasta la ejecución, ofreciendo soluciones que se adapten a sus necesidades.",
      strengthsTitle: "Nuestras Fortalezas",
      commitmentTitle: "Nuestro Compromiso",
      commitmentParagraph:
        "Estamos comprometidos con el crecimiento y el éxito de nuestros clientes, aportando un enfoque centrado en la calidad y la eficiencia.",
      features: [
        {
          title: "Equipo Multidisciplinario",
          description:
            "Contamos con un equipo de profesionales que combina habilidades técnicas, legales y constructivas para ofrecer soluciones integrales.",
        },
        {
          title: "Orientación al Crecimiento",
          description:
            "Nos enfocamos en potenciar el desarrollo de nuestros clientes, ofreciendo consultoría estratégica y eficiente.",
        },
        {
          title: "Compromiso con la Calidad",
          description:
            "Priorizamos la excelencia en cada proyecto, asegurando cumplimiento normativo y estándares de calidad en cada proceso.",
        },
        {
          title: "Innovación Constante",
          description:
            "Implementamos tecnologías avanzadas y enfoques innovadores para optimizar nuestras soluciones y servicios.",
        },
      ],
    },
    /**
     * Nueva sección "recurringJobsCarousel" 
     * conteniendo "slides" (un array) para que .map() funcione
     */
    recurringJobsCarousel: {
      sectionTitle: "Trabajos Recurrentes",
      sectionSubtitle:
        "Experiencia comprobada en soluciones integrales para cada sector",
      slides: [
        {
          title: "Contrataciones",
          description:
            "Nos encargamos de la gestión integral de contratos y licitaciones para servicios públicos y privados",
          items: ["Convenio marco", "Concesiones", "Obra pública", "Servicios y suministros"],
          image: "/images/biblioratos1.jpeg",
        },
        {
          title: "Locales gastronómicos y comerciales",
          description:
            "Logramos la habilitación de distintos locales gastronómicos y comerciales",
          image: "/images/locales_comerciales.jpeg",
        },
        {
          title: "Oficinas comerciales",
          description:
            "Nos encargamos de la gestión integral de proyectos de oficinas",
          image: "/images/oficina.jpeg",
        },
        {
          title: "Predios Deportivos",
          description:
            "Participamos en procesos donde se logró la adjudicación de predios",
          image: "/images/predios.jpeg",
        },
        {
          title: "Edificios de Vivienda",
          description:
            "Lideramos proyectos desde su planificación hasta su ejecución",
          image: "/images/viviendas.jpeg",
        },
        {
          title: "Servicios de Limpieza y Mantenimiento",
          description:
            "Logramos la adjudicación de licitaciones del servicio de Limpieza y Mantenimiento",
          image: "/images/limpieza.jpeg",
        },
      ],
    },
    consultoriaLicitaciones: {
        headerTitle: "Consultoría en Licitaciones Públicas y Privadas",
        headerParagraph:
          "Nuestro asesoramiento abarca todas las etapas de una licitación pública y privada, desde la confección de la documentación licitatoria hasta la ejecución del proyecto adjudicado.",
        headerImage: "/images/licitaciones.jpg",
        servicesTitle: "Nuestros Servicios",
  
        // Servicios (cards con bullet points)
        servicesArray: [
          {
            icon: "FileEdit",
            title: "Elaboración de Ofertas e Impugnaciones",
            details: [
              "Análisis de pliegos de bases y condiciones licitatorios",
              "Inscripción ante Registros de Proveedores",
              "Confección de documentación administrativa, técnica y oferta económica",
              "Confección de anteproyectos de obra y memorias descriptivas",
              "Análisis de ofertas de competidores y formulación de observaciones",
              "Elaboración de impugnaciones a dictámenes de evaluación de ofertas",
            ],
          },
          {
            icon: "Briefcase",
            title: "Ejecución del Proyecto Licitado",
            details: [
              "Confección de cuadros de seguimiento de evolución de índices",
              "Presentación de solicitudes de adecuaciones de precios",
              "Presentación de documentación requerida por pliegos",
              "Solicitudes de reconocimiento de mayores costos por inversiones adicionales",
              "Representación técnica y administrativa ante los organismos correspondientes",
            ],
          },
          {
            icon: "FileText",
            title: "Confección de Documentación Licitatoria",
            details: [
              "Pliegos de bases y condiciones generales y particulares",
              "Especificaciones técnicas",
              "Circulares aclaratorias y/o modificatorias",
              "Dictámenes de evaluación de ofertas",
              "Contratos administrativos y/o comerciales",
              "Actas de recepción y certificados de liquidación final",
            ],
          },
          {
            icon: "ClipboardList",
            title: "Gestión de Procedimientos Licitatorios",
            details: [
              "Gestión de invitaciones a potenciales oferentes",
              "Análisis de consultas y elaboración de respuestas",
              "Gestión del acto de apertura de ofertas",
              "Evaluación de ofertas y solicitud de aclaraciones",
              "Asesoramiento durante la ejecución contractual",
            ],
          },
        ],
  
        // Sección para el componente de iconos circulares (IconShowcaseLicitaciones)
        circleTitle: "Nuestros Servicios",
        circleServices: [
          {
            icon: "FileEdit",
            title: "Elaboración de Ofertas e Impugnaciones",
            content:
              "Análisis de pliegos de bases y condiciones licitatorios, inscripción ante Registros de Proveedores, confección de documentación administrativa, técnica y oferta económica, confección de anteproyectos de obra y memorias descriptivas, análisis de ofertas de competidores y formulación de observaciones, elaboración de impugnaciones a dictámenes de evaluación de ofertas.",
          },
          {
            icon: "Briefcase",
            title: "Ejecución del Proyecto Licitado",
            content:
              "Confección de cuadros de seguimiento de evolución de índices, presentación de solicitudes de adecuaciones de precios, presentación de documentación requerida por pliegos, solicitudes de reconocimiento de mayores costos por inversiones adicionales, representación técnica y administrativa ante los organismos correspondientes.",
          },
          {
            icon: "FileText",
            title: "Confección de Documentación Licitatoria",
            content:
              "Pliegos de bases y condiciones generales, particulares y especificaciones técnicas, circulares aclaratorias y/o modificatorias, dictámenes de evaluación de ofertas, contratos administrativos y/o comerciales, actas de recepción y certificados de liquidación final.",
          },
          {
            icon: "ClipboardList",
            title: "Gestión de Procedimientos Licitatorios",
            content:
              "Gestión de invitaciones a potenciales oferentes, análisis de consultas y elaboración de respuestas, gestión del acto de apertura de ofertas, evaluación de ofertas y solicitud de aclaraciones, asesoramiento durante la ejecución contractual.",
          },
        ],
      },
      proyectosConstructivos: {
        // Textos de la cabecera
        headerTitle: "Consultoría en Desarrollo de Proyectos Constructivos.",
        headerParagraph:
          "Nuestro asesoramiento integral en la gestoría de trámites requeridos para la realización de proyectos constructivos.",
        headerImage: "/images/proyectos.jpg",
        servicesTitle: "Nuestros Servicios",
  
        // Servicios en tarjetas (cada uno con icon, title, details)
        servicesArray: [
          {
            icon: "FileCheck",
            title: "Análisis de Factibilidad del Proyecto Constructivo",
            details: [
              "Análisis integral de aspectos morfológicos e interiorismo del anteproyecto",
              "Evaluación de usos requeridos",
              "Verificación de disposiciones del Código Urbanístico y de Edificación",
              "Informe de factibilidad de proyecto constructivo",
            ],
          },
          {
            icon: "PenLine",
            title: "Plano de Etapa de Proyecto y Permiso de Obra Civil",
            details: [
              "Adecuación de planos de arquitectura al formato municipal",
              "Tramitación de informes de dominio y certificados de aptitud ambiental",
              "Modificaciones de proyectos",
              "Seguimiento continuo del trámite con informes semanales",
            ],
          },
          {
            icon: "Building",
            title:
              "Planos de Instalaciones (Incendios, Sanitaria, Eléctrica, Ventilación Mecánica/Electromecánica)",
            details: [
              "Adecuación de los planos de instalaciones al formato municipal",
              "Tramitación de informes de dominio y certificados de aptitud ambiental",
              "Seguimiento continuo del trámite e informes de subsanaciones",
              "Conforme de obra de instalaciones. Incendio de obras instalaciones etc.",
            ],
          },
          {
            icon: "Ruler",
            title: "Plano de Mensura y Unificación Parcelaria",
            details: [
              "Adecuación del plano a formato municipal",
              "Tramitación de informes de dominio",
              "Informe de subsanaciones y adecuaciones correspondientes",
              "Seguimiento continuo del trámite con informes de situación semanal.",
            ],
          },
          {
            icon: "Hammer",
            title: "Plano de Demolición",
            details: [
              "Elaboración del plano de demolición con antecedentes de cada parcela",
              "Mediciones correspondientes",
              "Adecuación del plano a formato municipal",
              "Seguimiento del trámite e informes de subsanaciones",
            ],
          },
          {
            icon: "HardHat",
            title: "Portal Director de Obra",
            details: [
              "Gestión de trámites de solicitud de excavaciones",
              "Gestión de trámites de demoliciones",
              "Solicitud de alta de obra, cartel de obra, (AVO 1, 2 y 3)",
              "Seguimiento continuo del trámite con informes semanales",
            ],
          },
          {
            icon: "Home",
            title: "Conforme a Obra (AVO 4)",
            details: [
              "Adecuación de planos de arquitectura de obra ejecutada a formato municipal",
              "Tramitación de informes de dominio y certificados de aptitud ambiental",
              "Regularización de Obra en Contravención y Ajuste de Obra",
              "Seguimiento continuo del trámite con reportes semanales",
            ],
          },
          {
            icon: "Layers",
            title: "División en Propiedad Horizontal (MH)",
            details: [
              "Adecuación del plano a formato municipal",
              "Tramitación de informes de dominio",
              "Tramitación ante registro de la propiedad inmueble",
              "Seguimiento del trámite e informes de subsanaciones",
            ],
          },
        ],
  
        // Servicios circulares (para el componente "CircularServiceShowcase")
        circleTitle: "Nuestros Servicios",
        circleServices: [
          {
            icon: "FileCheck",
            title: "Análisis de Factibilidad del Proyecto Constructivo",
            content:
              "Análisis integral de aspectos morfológicos e interiorismo del anteproyecto, evaluación de usos requeridos, verificación de disposiciones del Código Urbanístico y de Edificación, informe de factibilidad de proyecto constructivo.",
          },
          {
            icon: "PenLine",
            title: "Plano de Etapa de Proyecto y Permiso de Obra Civil",
            content:
              "Adecuación de planos de arquitectura al formato municipal, tramitación de informes de dominio y certificados de aptitud ambiental, modificaciones de proyectos, seguimiento continuo del trámite con informes semanales.",
          },
          {
            icon: "Building",
            title:
              "Planos de Instalaciones (Incendios, Sanitaria, Eléctrica, Ventilación, Mecánica/Electromecánica)",
            content:
              "Adecuación de los planos de instalaciones al formato municipal, tramitación de informes de dominio y certificados de aptitud ambiental, seguimiento continuo del trámite e informes de subsanaciones, conforme de obra de instalaciones.",
          },
          {
            icon: "Ruler",
            title: "Plano de Mensura y Unificación Parcelaria",
            content:
              "Adecuación del plano a formato municipal, tramitación de informes de dominio, informe de subsanaciones y adecuaciones correspondientes, seguimiento continuo del trámite con informes de situación semanal.",
          },
          {
            icon: "Hammer",
            title: "Plano de Demolición",
            content:
              "Elaboración del plano de demolición con antecedentes de cada parcela, mediciones correspondientes, adecuación del plano a formato municipal, seguimiento del trámite e informes de subsanaciones.",
          },
          {
            icon: "HardHat",
            title: "Portal Director de Obra",
            content:
              "Gestión de trámites de solicitud de excavaciones, demoliciones, alta de obra, cartel de obra, AVO 1, 2 y 3, seguimiento continuo del trámite con informes semanales",
          },
          {
            icon: "Home",
            title: "Conforme a Obra (AVO 4)",
            content:
              "Adecuación de planos de arquitectura de obra ejecutada a formato municipal, tramitación de informes de dominio y certificados de aptitud ambiental, regularización de obra en contravención y ajuste de obra, seguimiento continuo del trámite con reportes semanales.",
          },
          {
            icon: "Layers",
            title: "División en Propiedad Horizontal (MH)",
            content:
              "Adecuación del plano a formato municipal, tramitación de informes de dominio, tramitación ante registro de la propiedad inmueble, seguimiento del trámite e informes de subsanaciones.",
          },
        ],
      },
      contact: {
        pageTitle: "Contacto",
        formTitle: "Envíanos un mensaje",
        namePlaceholder: "Nombre y Apellido",
        emailPlaceholder: "Email",
        phonePlaceholder: "Teléfono",
        messagePlaceholder: "Mensaje",
        sendButton: "Enviar mensaje",
        statusSending: "Enviando...",
        statusSuccess: "Mensaje enviado con éxito.",
        statusError: "Hubo un problema al enviar el mensaje.",
        contactInfoTitle: "Información de contacto",
        addressTitle: "Dirección",
        addressLine1: "Av. Juramento 1475",
        addressLine2: "Ciudad Autónoma de Buenos Aires (CABA)",
        addressLine3: "Argentina",
        locationTitle: "Nuestra ubicación",
        mapIframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.186701394429!2d-58.45733868477193!3d-34.55229808047303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb42963ff8f35%3A0x61eb7e88bba1a7ff!2sJuramento%201475%2C%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1620930128000!5m2!1sen!2sar", 
        
      },
      licitacionesPage: {
        pageTitle: "Próximas Licitaciones CABA",
        pageSubtitle: "",
        filtersTitle: "Filtros de Búsqueda",
        categoryLabel: "Categoría",
        allCategories: "Todas las categorías",
        typeLabel: "Tipo de Contratación",
        allTypes: "Todos los tipos",
        nameLabel: "Buscar por nombre",
        namePlaceholder: "Nombre de la licitación",
        dateLabel: "Fecha de apertura",
        unavailable: "No disponible",
        noResults: "No se encontraron licitaciones para los filtros seleccionados.",
        liveDataNote:
          "",
        
        // Para los fallbacks (puedes usarlos si gustas)
        noCategory: "Sin Clasificación",
        noState: "Sin Estado",
        noContractType: "Sin Tipo de Contratación",
        noName: "Nombre no disponible",
        noDate: "Fecha no disponible",

        // NUEVO: Para Jurisdicción
        jurisdictionLabel: "Jurisdicción",
        allJurisdictions: "Todas las jurisdicciones",
      },
  
  },

  en: {
    layout: {
      title: "Inted - Consulting and Project Management",
    },
    navbar: {
      quienesSomos: "About Us",
      areasPractica: "Practice Areas",
      licitaciones: "Tenders",
      contacto: "Contact",
      licitacionesPublicasPrivadas: "Public and/or Private Tenders",
      proyectosConstructivos: "Construction Project Development",
    },
    hero: {
      title: "Public and/or Private Project Management",
      subtitle:
        "We provide comprehensive advice on construction project management and execution of public or private contracts.",
    },
    companyOverview: {
      heading: "Innovation and Quality in Consulting",
      paragraph1:
        "Inted is an innovative consulting firm offering comprehensive advice on the management of construction projects and public/private tenders, ensuring speed and efficiency at every stage.",
      paragraph2:
        "We offer a wide range of services, covering the administrative procedures of construction projects and preparing bids for public or private tenders. Our multidisciplinary team combines expertise in both the public and private sectors.",
      button: "Learn More",
    },
    practiceAreas: {
      heading: "Practice Areas",
      area1: "Public and/or Private Tenders",
      area2: "Construction Project Development",
      verMas: "View More",
      services: {
        elaboracionOfertas: "Preparing Bids and Appeals",
        ejecucionProyecto: "Execution of the Awarded Project",
        gestionProcedimientos: "Management of Tender Procedures",
        planoEtapa: "Project Stage Plan and Civil Work Permit",
        planosInstalaciones: "Facilities Plans",
        portalDirector: "Construction Director Portal",
      },
    },
    tenderPreview: {
      title: "Tenders CABA",
      categoryLabel: "Category:",
      description: "Tenders in category",
      totalLabel: "Total Active Purchase Processes:",
      amountLabel: "Total Purchase Processes Amount:",
      noDisponible: "Not available",
      seeActiveTenders: "See Active Tenders",
      recentTenders: "Recent Tenders",
      aperturaLabel: "Open",
      montoLabel: "Amount",
      liveDataNote:
        "Data is displayed in Spanish because it comes from a live feed and is not automatically translated.",
    },
    footer: {
      quickLinks: "Quick Links",
      location: "Location",
      link1: "Public and/or Private Tenders",
      link2: "Construction Project Development",
      link3: "Active Tenders",
      link4: "Contact",
      yearRights: "© {year} Inted. All rights reserved.",
      developedBy: "Site developed by Inted",
    },
    // quienesSomos con "features"
    quienesSomos: {
      heroTitle: "Inted",
      heroParagraph:
        "We are an innovative consulting firm offering comprehensive advice on construction projects and public/private tenders, ensuring regulatory compliance at every stage of the process.",
      missionTitle: "Our Mission",
      missionParagraph:
        "We accompany our clients through every stage of their project, from planning to execution, offering tailored solutions that meet their needs.",
      strengthsTitle: "Our Strengths",
      commitmentTitle: "Our Commitment",
      commitmentParagraph:
        "We are committed to the growth and success of our clients, providing a quality- and efficiency-centered approach.",
      features: [
        {
          title: "Multidisciplinary Team",
          description:
            "We have a team of professionals combining technical, legal, and construction skills to offer comprehensive solutions.",
        },
        {
          title: "Growth Orientation",
          description:
            "We focus on enhancing our clients' development by providing strategic and efficient consulting services.",
        },
        {
          title: "Quality Commitment",
          description:
            "We prioritize excellence in each project, ensuring regulatory compliance and quality standards in every process.",
        },
        {
          title: "Constant Innovation",
          description:
            "We implement advanced technologies and innovative approaches to optimize our solutions and services.",
        },
      ],
    },
    // recurringJobsCarousel con "slides"
    recurringJobsCarousel: {
      sectionTitle: "Recurring Projects",
      sectionSubtitle:
        "Proven experience in comprehensive solutions for each sector",
      slides: [
        {
          title: "Contracting",
          description:
            "We handle the comprehensive management of contracts and tenders for public and private services",
          items: ["Framework agreement", "Concessions", "Public works", "Services and supplies"],
          image: "/images/biblioratos1.jpeg",
        },
        {
          title: "Gastronomic and Commercial Premises",
          description:
            "We obtained permits for various gastronomic and commercial premises",
          image: "/images/locales_comerciales.jpeg",
        },
        {
          title: "Commercial Offices",
          description: "We manage office projects comprehensively",
          image: "/images/oficina.jpeg",
        },
        {
          title: "Sports Grounds",
          description: "We participated in processes to award sports grounds",
          image: "/images/predios.jpeg",
        },
        {
          title: "Residential Buildings",
          description: "We lead projects from planning to execution",
          image: "/images/viviendas.jpeg",
        },
        {
          title: "Cleaning and Maintenance Services",
          description:
            "We secured tender awards for cleaning and maintenance services",
          image: "/images/limpieza.jpeg",
        },
      ],
    },

    consultoriaLicitaciones: {
        headerTitle: "Public and/or Private Tenders Consulting",
        headerParagraph:
          "Our advisory services cover all stages of a public or private tender, from drafting the bidding documents to executing the awarded project.",
        headerImage: "/images/licitaciones.jpg",
        servicesTitle: "Our Services",
  
        servicesArray: [
          {
            icon: "FileEdit",
            title: "Bid Preparation and Appeals",
            details: [
              "Analysis of bidding terms and conditions",
              "Registration with Vendor Registers",
              "Preparation of administrative, technical, and financial proposals",
              "Drafting preliminary project plans and descriptive reports",
              "Competitor offer analysis and formulation of observations",
              "Filing appeals against offer evaluation reports",
            ],
          },
          {
            icon: "Briefcase",
            title: "Execution of the Awarded Project",
            details: [
              "Preparation of index trend tracking tables",
              "Submission of price adjustment requests",
              "Providing documentation required by the bidding terms",
              "Requests for recognition of additional costs for extra investments",
              "Technical and administrative representation before relevant authorities",
            ],
          },
          {
            icon: "FileText",
            title: "Drafting Bidding Documentation",
            details: [
              "General and specific bidding terms and conditions",
              "Technical specifications",
              "Clarification and/or amendment circulars",
              "Offer evaluation reports",
              "Administrative and/or commercial contracts",
              "Acceptance records and final payment certificates",
            ],
          },
          {
            icon: "ClipboardList",
            title: "Tender Procedures Management",
            details: [
              "Invitations to potential bidders",
              "Analysis of inquiries and preparation of responses",
              "Management of bid opening procedures",
              "Offer evaluation and clarifications requests",
              "Advisory services during contract execution",
            ],
          },
        ],
  
        circleTitle: "Our Services",
        circleServices: [
          {
            icon: "FileEdit",
            title: "Bid Preparation and Appeals",
            content:
              "Analysis of bidding terms and conditions, registration with Vendor Registers, preparation of administrative, technical, and financial proposals, drafting preliminary project plans and descriptive reports, competitor offer analysis and formulation of observations, filing appeals against offer evaluation reports.",
          },
          {
            icon: "Briefcase",
            title: "Execution of the Awarded Project",
            content:
              "Preparation of index trend tracking tables, submission of price adjustment requests, providing documentation required by the bidding terms, requests for recognition of additional costs for extra investments, technical and administrative representation before relevant authorities.",
          },
          {
            icon: "FileText",
            title: "Drafting Bidding Documentation",
            content:
              "General and specific bidding terms and conditions, technical specifications, clarification and/or amendment circulars, offer evaluation reports, administrative and/or commercial contracts, acceptance records and final payment certificates.",
          },
          {
            icon: "ClipboardList",
            title: "Tender Procedures Management",
            content:
              "Invitations to potential bidders, analysis of inquiries and preparation of responses, management of bid opening procedures, offer evaluation and clarifications requests, advisory services during contract execution.",
          },
        ],
      },
      proyectosConstructivos: {
        headerTitle: "Consulting for Construction Project Development",
        headerParagraph:
          "Our comprehensive advisory services help manage all the required procedures for construction projects.",
        headerImage: "/images/proyectos.jpg",
        servicesTitle: "Our Services",
  
        servicesArray: [
          {
            icon: "FileCheck",
            title: "Construction Project Feasibility Analysis",
            details: [
              "Comprehensive analysis of morphological aspects and interior design of the preliminary project",
              "Evaluation of required uses",
              "Verification of Urban and Building Code regulations",
              "Feasibility report for the construction project",
            ],
          },
          {
            icon: "PenLine",
            title: "Project Stage Plan and Civil Works Permit",
            details: [
              "Adapting architectural plans to municipal format",
              "Processing domain reports and environmental aptitude certificates",
              "Project modifications",
              "Continuous monitoring with weekly reports",
            ],
          },
          {
            icon: "Building",
            title:
              "Installation Plans (Fire, Sanitary, Electrical, Ventilation, Mechanical/Electromechanical)",
            details: [
              "Adapting installation plans to municipal format",
              "Processing domain reports and environmental aptitude certificates",
              "Continuous monitoring and resolution of deficiencies",
              "As-built documentation for installations, fire systems, etc.",
            ],
          },
          {
            icon: "Ruler",
            title: "Land Survey and Parcel Unification Plan",
            details: [
              "Adapting the plan to municipal format",
              "Processing domain reports",
              "Issuing deficiency reports and corresponding adjustments",
              "Continuous monitoring with weekly status updates",
            ],
          },
          {
            icon: "Hammer",
            title: "Demolition Plan",
            details: [
              "Drafting the demolition plan with background data for each parcel",
              "Appropriate measurements",
              "Adapting the plan to municipal format",
              "Monitoring the process and issuing deficiency reports",
            ],
          },
          {
            icon: "HardHat",
            title: "Construction Site Director Portal",
            details: [
              "Managing excavation permit requests",
              "Handling demolition permits",
              "Applying for construction start, site sign, AVO 1, 2, and 3",
              "Continuous monitoring with weekly reports",
            ],
          },
          {
            icon: "Home",
            title: "As-Built (AVO 4)",
            details: [
              "Adapting the actual built architectural plans to municipal format",
              "Processing domain reports and environmental aptitude certificates",
              "Regularization of non-compliant works and adjustments",
              "Continuous monitoring with weekly reporting",
            ],
          },
          {
            icon: "Layers",
            title: "Horizontal Property Division (MH)",
            details: [
              "Adapting the plan to municipal format",
              "Processing domain reports",
              "Filing at the Real Estate Registry",
              "Monitoring the process and issuing deficiency reports",
            ],
          },
        ],
  
        circleTitle: "Our Services",
        circleServices: [
          {
            icon: "FileCheck",
            title: "Construction Project Feasibility Analysis",
            content:
              "Comprehensive analysis of morphological and interior design aspects of the preliminary project, evaluation of required uses, verification of Urban and Building Code regulations, feasibility report.",
          },
          {
            icon: "PenLine",
            title: "Project Stage Plan and Civil Works Permit",
            content:
              "Adapting architectural plans to municipal format, processing domain reports and environmental certificates, project modifications, continuous monitoring with weekly reports.",
          },
          {
            icon: "Building",
            title:
              "Installation Plans (Fire, Sanitary, Electrical, Ventilation, Mechanical/Electromechanical)",
            content:
              "Adapting installation plans to municipal format, processing domain reports and environmental certificates, continuous monitoring and resolution of deficiencies, as-built documentation for installations, etc.",
          },
          {
            icon: "Ruler",
            title: "Land Survey and Parcel Unification Plan",
            content:
              "Adapting the plan to municipal format, processing domain reports, issuing deficiency reports and adjustments, continuous monitoring with weekly status updates.",
          },
          {
            icon: "Hammer",
            title: "Demolition Plan",
            content:
              "Drafting the demolition plan with background data for each parcel, taking measurements, adapting the plan to municipal format, monitoring the process and issuing deficiency reports.",
          },
          {
            icon: "HardHat",
            title: "Construction Site Director Portal",
            content:
              "Managing excavation permit requests, demolition permits, starting the construction, site sign, AVO 1, 2, 3, continuous monitoring with weekly reports.",
          },
          {
            icon: "Home",
            title: "As-Built (AVO 4)",
            content:
              "Adapting actual built architectural plans to municipal format, processing domain reports and environmental certificates, regularizing non-compliant works, continuous monitoring with weekly updates.",
          },
          {
            icon: "Layers",
            title: "Horizontal Property Division (MH)",
            content:
              "Adapting the plan to municipal format, processing domain reports, filing at the Real Estate Registry, monitoring the process and issuing deficiency reports.",
          },
        ],
      },
      contact: {
        pageTitle: "Contact",
        formTitle: "Send us a message",
        namePlaceholder: "Name and Surname",
        emailPlaceholder: "Email",
        phonePlaceholder: "Phone",
        messagePlaceholder: "Message",
        sendButton: "Send message",
        statusSending: "Sending...",
        statusSuccess: "Message sent successfully.",
        statusError: "There was a problem sending your message.",
        contactInfoTitle: "Contact Information",
        addressTitle: "Address",
        addressLine1: "Av. Juramento 1475",
        addressLine2: "Buenos Aires City (CABA)",
        addressLine3: "Argentina",
        locationTitle: "Our location",
        mapIframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.186701394429!2d-58.45733868477193!3d-34.55229808047303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb42963ff8f35%3A0x61eb7e88bba1a7ff!2sJuramento%201475%2C%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1620930128000!5m2!1sen!2sar", 
      },
      licitacionesPage: {
        pageTitle: "Upcoming Tenders",
        pageSubtitle: "",
        filtersTitle: "Search Filters",
        categoryLabel: "Category",
        allCategories: "All categories",
        typeLabel: "Contract Type",
        allTypes: "All types",
        nameLabel: "Search by name",
        namePlaceholder: "Tender name",
        dateLabel: "Opening date",
        unavailable: "Not available",
        noResults: "No tenders found for the selected filters.",
        liveDataNote:
          "Data is displayed in Spanish because it comes from a live feed and is not automatically translated.",
  
        // Fallback
        noCategory: "Uncategorized",
        noState: "No State",
        noContractType: "No Contract Type",
        noName: "No name available",
        noDate: "Date not available",

        // NUEVO: Para Jurisdicción
        jurisdictionLabel: "Jurisdiction",
        allJurisdictions: "All jurisdictions",
      },

  },
};

const TranslationContext = createContext();

export default function TranslationProvider({ children }) {
  // Estado global para el idioma
  const [language, setLanguage] = useState("es");

  // Persistir en localStorage (opcional)
  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage");
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("appLanguage", language);
  }, [language]);

  // Función para traducir
  function t(section, key) {
    // Si no existe la sección o la clave, retorna ""
    return dictionary[language]?.[section]?.[key] || "";
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
