import { Geist, Geist_Mono } from "next/font/google";
import StoreProvider from "@/components/redux/StoreProvider";
import StorageWrapper from "@/components/ecommerce/storage-wrapper";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../public/assets/css/main.css";
import "./globals.css";
import "swiper/css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Spirunat",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <StorageWrapper>
            <Navbar />
            {children}
            <ToastContainer style={{ zIndex: 99999 }} />
          </StorageWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
