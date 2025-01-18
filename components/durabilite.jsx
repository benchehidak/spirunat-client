import React from 'react';
import { Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { FaHeartbeat, FaRecycle, FaWater, FaSolarPanel, FaHandsHelping } from 'react-icons/fa';

export default function Durabilite() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <Typography
          variant="h2"
          className="mb-4 font-extrabold text-white"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          LES LABORATOIRES <span className="font-bold">SPIRUNAT</span>
        </Typography>
        <Typography
          variant="h6"
          className="mt-4 text-white"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Soutenez votre santé, préservez notre planète
        </Typography>
      </div>

      {/* Introduction */}
      <div className="text-center mb-12">
        <Typography
          variant="h5"
          className="text-white mb-6"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Un Engagement Fort envers les Objectifs de Développement Durable (SDG)
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-300 max-w-2xl mx-auto"
          style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}
        >
          Chez SPIRUNAT, nous avons pleinement intégré les Objectifs de Développement Durable
          (SDG) des Nations Unies dans notre approche, afin de contribuer à un avenir plus
          respectueux de la planète et des générations futures.
        </Typography>
      </div>

      {/* SDG Sections */}
      <Grid container spacing={4} justifyContent="center" className="mb-16">
        {/* Example for one SDG box */}
        {[ // Array of SDG data for reuse
          { icon: <FaHeartbeat className="text-green-500 text-6xl mx-auto mt-6" />, title: "Santé et Bien-être (SDG 3)", text: "Nos formulations à base de spiruline renforcent les défenses naturelles et améliorent la qualité de vie." },
          { icon: <FaRecycle className="text-yellow-500 text-6xl mx-auto mt-6" />, title: "Production et Consommation Responsables (SDG 12)", text: "Nous réduisons notre empreinte écologique grâce à des procédés respectueux de l’environnement." },
          { icon: <FaWater className="text-blue-500 text-6xl mx-auto mt-6" />, title: "Vie Aquatique et Terrestre (SDG 14 & 15)", text: "En cultivant des microalgues durablement, nous protégeons les écosystèmes marins et la biodiversité terrestre." },
          { icon: <FaSolarPanel className="text-orange-500 text-6xl mx-auto mt-6" />, title: "Énergie Propre et Accessibilité (SDG 7)", text: "Nous adoptons des technologies réduisant notre consommation énergétique et explorons les énergies renouvelables." },
          { icon: <FaHandsHelping className="text-purple-500 text-6xl mx-auto mt-6" />, title: "Partenariats pour la Réalisation des Objectifs (SDG 17)", text: "Nous collaborons avec des instituts et des organisations pour promouvoir des solutions de santé durables." }
        ].map((sdg, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card className="bg-[#ffffff6c] text-white">
              <CardMedia>{sdg.icon}</CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  className="text-center font-bold"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {sdg.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-300 mt-2 text-center"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {sdg.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <div className="footer text-center">
        <Typography
          variant="body2"
          className="text-gray-400"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Engageons-nous pour un avenir meilleur.
        </Typography>
      </div>
    </div>
  );
}
