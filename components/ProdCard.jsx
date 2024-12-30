import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="flex-none w-full max-w-xs transition-transform duration-300 ease-in-out">
      <div className="relative flex flex-col overflow-hidden rounded-lg bg-[#ffffff6c] shadow-[2px_4px_10px_#386641] transition-all duration-300 hover:scale-105">
        
        {/* Wrap the image inside the anchor tag */}
        <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl transition-all duration-300" href="#">
          <img className="object-cover w-full h-full" src="/assets/images/produits/produit_sport.webp" alt={product.name} />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {product.discount} OFF
          </span>
        </a>
        
        <div className="mt-4 px-5 pb-5">
          <a href="">
            <h5 className="text-xl tracking-tight  text-white">{product.name}</h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-center">
            <p className="text-center">
              <span className="text-3xl font-bold  text-white">{product.price}</span>
            </p>
          </div>
          <a href="#" className="flex items-center justify-center rounded-md bg-[#386641] px-5 py-2.5 text-center text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#386641]/90">
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;