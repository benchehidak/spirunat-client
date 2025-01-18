import React from "react";

export default function TimelineSection() {
  const timelineEvents = [
    {
      year: "Notre Origine",
      title: "La Naissance de SPIRUNAT",
      description: "Création des Laboratoires SPIRUNAT avec une vision claire : révolutionner l'industrie de la micronutrition et des cosmétiques naturels.",
      highlight: true
    },
    {
      year: "Innovation",
      title: "Pionnier de la Micronutrition",
      description: "Développement d'une équipe de chercheurs spécialisés dans l'étude et l'extraction des actifs des microalgues, en particulier la spiruline."
    },
    {
      year: "Expansion",
      title: "Excellence et Durabilité",
      description: "Établissement de processus rigoureux pour garantir la qualité exceptionnelle de chaque produit développé par SPIRUNAT."
    },
    {
      year: "Aujourd'hui",
      title: "Leader en Microalgues",
      description: "SPIRUNAT s'impose comme une référence en matière d'innovation dans le domaine des microalgues et de la santé naturelle.",
      highlight: true
    }
  ];

  return (
    <section className="bg-cover bg-center bg-fixed py-20 min-h-screen" style={{ backgroundImage: 'url("/path/to/your/background.jpg")' }}>
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center text-white mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100 mb-4">
            LES LABORATOIRES <span className="text-slate-100">SPIRUNAT</span>
          </h2>
          <p className="text-lg md:text-xl">
            L'énergie de la nature, au service de votre bien-être
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line - Desktop */}
          <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#1e3f35]" />
          
          {/* Left Line - Mobile */}
          <div className="absolute md:hidden left-4 h-full w-1 bg-[#1e3f35]" />

          {/* Timeline Events */}
          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <div 
                key={index}
                className={`relative flex items-center ${
                  // Mobile: Always right-aligned content
                  // Desktop: Alternating left-right
                  `md:${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`
                }`}
              >
                {/* Content */}
                <div 
                  className={`w-full md:w-5/12 pl-12 md:pl-0 
                    ${index % 2 === 0 
                      ? "md:text-right md:pr-8" 
                      : "md:text-left md:pl-8"
                    }`}
                >
                  <div className={`p-6 rounded-lg ${
                    event.highlight 
                      ? "bg-[#1e3f35] text-white" 
                      : "bg-white bg-opacity-20 text-white"
                  }`}>
                    <h3 className={`text-2xl font-bold mb-2 ${event.highlight ? "text-white" : "text-black"}`}>
                      {event.year}
                    </h3>
                    <h4 className={`text-xl font-semibold mb-3 ${event.highlight ? "text-slate-200" : "text-gray-600"}`}>
                      {event.title}
                    </h4>
                    <p className="text-base">{event.description}</p>
                  </div>
                </div>

                {/* Center Point - Desktop */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#1e3f35] rounded-full border-4 border-white" />
                
                {/* Left Point - Mobile */}
                <div className="absolute md:hidden left-4 transform -translate-x-1/2 w-4 h-4 bg-[#1e3f35] rounded-full border-4 border-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-24 text-white text-center">
          <h3 className="text-3xl font-bold text-slate-100 mb-8">Nos Valeurs Fondamentales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Innovation continue pour un avenir plus sain",
              "Durabilité et respect de l'environnement",
              "Engagement envers l'excellence et la qualité",
              "Transparence et intégrité dans toutes nos démarches"
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-white bg-opacity-20 p-6 rounded-lg hover:bg-[#1e3f35] transition-colors duration-300"
              >
                <p className="text-lg">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-16 text-center text-white">
          <p className="text-lg italic">
            Chez SPIRUNAT, nous sélectionnons avec soin des matériaux de haute qualité 
            et les fabriquons avec la plus grande précision en Tunisie.
          </p>
        </div>
      </div>
    </section>
  );
}