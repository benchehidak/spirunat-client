"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa"; 
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Check if viewport is mobile size
      if (window.innerWidth >= 768) setIsMenuOpen(false); // Close menu if switching to desktop
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup listener
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements[0].value;
    window.location.href = `/search/${searchQuery}`;
    // Add your search logic here
  };

  return (
    <header className="bg-gradient-to-b from-[#0f1d16] via-[#0f1d16]/90 to-transparent h-20 sticky top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link href="/">
          <img
            src="/assets/images/logo blanc.png"
            className="w-32"
            alt="Logo"
          />
        </Link>
        <div className="flex-grow mx-4">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 p-2 rounded-md bg-white text-black"
            />
          </form>
        </div>

        {isMobile && (
          <div className="flex items-center gap-4">
            <Link href="/shop-cart">
              <div className="text-white hover:scale-125 transition-all duration-300">
                <FaShoppingCart size={20} />
              </div>
            </Link>
            <button
              className="text-white md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        )}

        <ul
          className={`${
            isMobile && !isMenuOpen ? "hidden" : "block"
          } md:flex gap-8 absolute md:static bg-[#0f1d16] md:bg-transparent top-20 left-0 w-full md:w-auto p-4 md:p-0 transition-all duration-300`}
        >
          <Link href="/products">
            <li className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold mt-2">
              Produits
            </li>
          </Link>
          <Link href="/expertise">
            <li className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold mt-2">
              Expertise
            </li>
          </Link>
          <Link href="/durabilite">
            <li className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold mt-2">
              Durabilité
            </li>
          </Link>
          <Link href="/about">
            <li className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold mt-2">
              A propos
            </li>
          </Link>
          {!isMobile && (
            <>
              <Link href="/shop-cart">
                <li className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold mt-2">
                  <FaShoppingCart size={20} />
                </li>
              </Link>
              <Link 
              href={session ? "/account/1" : "/login"}
              >
                <li className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold mt-2">
                  <FaUser size={20} />
                </li>
              </Link>
            </>
          )}
          {
            isMobile && (
              <Link 
              href={session ? "/account/1" : "/login"}
              >
                <li className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold mt-2">
                  Se Connecter
                </li>
              </Link>
            )
          }
        </ul>
      </div>
    </header>
  );
}
