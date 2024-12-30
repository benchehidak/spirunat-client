import React from 'react';
import ProductCard from './ProdCard';
const ProductGrid = () => {
  const products = [
    {
      name: "Arabian Musk",
      price : "$79.00",
      imageSrc: "/assets/images/produits/produit_sport.webp",
      onSale: true,
    },
    {
      name: "Albanian Essence",
      price: "$299.00",
      imageSrc: "https://placehold.co/600x400",
    },
    {
      name: "Siberian Perfum",
      price: "$49.00",
      imageSrc: "https://placehold.co/600x400",
    },
    {
      name: "Danish Levoune",
      price: "$79.00",
      imageSrc: "https://placehold.co/600x400",
    },
  ];

  return (
    <section className="  text-gray-700 ">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4 text-center">
          {products.map((product, index) => (
            <ProductCard key={index} product={product}/>
            
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;


{/* <article key={index} className="relative">
              <div className="aspect-square overflow-hidden">
                <img
                  className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                  src={product.imageSrc}
                  alt={product.name}
                />
              </div>
              {product.onSale && (
                <div className="absolute top-0 m-1 rounded-full bg-white">
                  <p className="text-[10px] rounded-full bg-black p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
                    Sale
                  </p>
                </div>
              )}
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                    <a href="#" title={product.name} className="cursor-pointer">
                      {product.name}
                      <span className="absolute" aria-hidden="true"></span>
                    </a>
                  </h3>
                </div>
                <div className="text-right">
                  {product.originalPrice ? (
                    <>
                      <del className="mt-px text-xs font-semibold text-gray-600 sm:text-sm">
                        {product.originalPrice}
                      </del>
                      <p className="text-xs font-normal sm:text-sm md:text-base">
                        {product.salePrice}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs font-normal sm:text-sm md:text-base">
                      {product.price}
                    </p>
                  )}
                </div>
              </div>
            </article> */}