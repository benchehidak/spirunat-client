"use client";
import React, { useEffect, useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import Expertise from "@/components/Expertise";
import ExpertiseData from "@/public/data/expertise.json";
import Durabilite from "@/components/durabiliteHomeSection";
import AboutSection from "@/components/About";

// simple fade-up variant
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="bg-cover bg-center min-h-screen">
      <Container className="bg-slate-200 p-8 rounded-lg shadow-xl max-w-6xl mt-0 mb-10 bg-opacity-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-10 mt-0"
        >
          <h1 className=" text-white font-bold text-5xl md:text-6xl xl:text-7xl">
            L'énergie de la nature,
            <br /> au service de votre bien-être
            <span className="text-primary text-white"></span>
          </h1>
          <p className="mt-14  text-gray-300 text-lg font-medium leading-relaxed">
          Chez les Laboratoires Spirunat, nous vous proposons de la spiruline
            de haute qualité, riche en nutriments essentiels pour soutenir votre
            santé et votre énergie. Découvrez notre gamme de produits bio 100 %
            naturels, conformes aux normes pharmaceutiques, garantissant ainsi
            leur pureté et leur efficacité.
            <br />
            Faites le choix des produits Spirunat pour un bien-être durable.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="mt-12"
        >
          <h2 className="text-3xl font-semibold  text-white text-center">
            Nos gammes
          </h2>
          <div className="py-4 mt-4 sm:flex justify-center sm:space-x-24">
            {["sport","nutraceutique","cosmetique"].map((key, i) => (
              <motion.span
                key={i}
                variants={fadeUp}
                className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125"
              >
                <img
                  src={`/assets/images/icons/${key}.png`}
                  alt={`${key} logo`}
                  className="h-28 w-28 relative z-0 rounded-lg"
                />
                <span className="mt-2 text-xl font-semibold text-white text-center">
                  {key === "nutraceutique" ? "Micronutrition" : key.charAt(0).toUpperCase()+key.slice(1)}
                </span>
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={fadeUp}
        >
          <Expertise data={ExpertiseData} />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={fadeUp}
        >
          <Durabilite />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={fadeUp}
        >
          <AboutSection />
        </motion.div>
      </Container>
    </div>
  );
}