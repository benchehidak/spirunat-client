'use client';
import React, { useEffect, useState } from 'react';
import { Container, CircularProgress } from '@mui/material';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchListings = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/listing/');
  //       const data = await response.json();
  //       if (Array.isArray(data.listings)) {
  //         setListings(data.listings);
  //       } else {
  //         console.error('Unexpected response format:', data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching listings:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchListings();
  // }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      
    >
      <Container className="bg-slate-200 p-8 rounded-lg shadow-xl max-w-6xl mt-0 mb-10 bg-opacity-0">
        <div className="text-center mb-10 mt-0">
        {/* <div className="w-[300px] h-[50px] bg-blue-500 border-2 border-black absolute top-20 right-6"></div> */}
        <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
            L'énergie de la nature,
            <br /> au service de votre bien-être
            <span className="text-primary dark:text-white"></span>
          </h1>
          <p className="mt-14 text-gray-700 dark:text-gray-300 text-lg font-medium leading-relaxed">
            Chez les Laboratoires Spirunat, nous vous proposons de la spiruline de haute qualité, riche en
            nutriments essentiels pour soutenir votre santé et votre énergie. Découvrez notre gamme
            de produits bio 100 % naturels, conformes aux normes pharmaceutiques, garantissant ainsi
            leur pureté et leur efficacité.
            <br />
            Faites le choix des produits Spirunat pour un bien-être durable.
          </p>
        </div>
        

        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center">Nos gammes</h2>
          <div className="py-4 mt-4 sm:flex justify-center space-x-24">
            <span className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125">
              <img src="/assets/images/icons/sport.png" alt="Sport logo" className="h-28 w-28 relative z-0 rounded-lg" />
              <span className="mt-2 text-xl font-semibold text-white text-center">Sport</span>
            </span>
            <span className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125">
              <img src="/assets/images/icons/nutraceutique.png" alt="Nutraceutique logo" className="h-28 w-28 relative z-0 rounded-lg" />
              <span className="mt-2 text-xl font-semibold text-white text-center">Micronutrition</span>
            </span>
            <span className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125">
              <img src="/assets/images/icons/cosmetique.png" alt="Cosmetique logo" className="h-28 w-28 relative z-0 rounded-lg" />
              <span className="mt-2 text-xl font-semibold text-white text-center">Cosmétique</span>
            </span>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center">Meilleurs produits</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {/* {listings.map((listing) => (
              <ProductCard key={listing.id} product={listing} />
            ))} */}
            <ProductGrid/>
          </div>
        </div>
      </Container>
    </div>
  );
}
