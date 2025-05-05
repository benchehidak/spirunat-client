import React from "react";
import * as Icons from "react-icons/fa"; // Import all FontAwesome icons
import data from "@/public/data/sdgData.json";

const SDGItem = ({ data }) => {
  const Icon = Icons[data.icon];
  return (
    <div className="sdg-item rounded-2xl bg-[#1e3f35] h-full border-4 group hover:border-[#f36420]">
      <div className="main md:p-10 p-8 flex flex-col items-center h-full">
        {/* <Icon className="text-6xl text-slate-100" /> */}
        <img src={`/assets/images/${data.icon}`} style={{height:'80px'}} alt="" />
        <strong className="heading5 mt-6 text-white text-shadow-hover">{data.title}</strong>
        <p className="service-desc text-white text-center mt-3 text-shadow-hover">{data.description}</p>
      </div>
    </div>
  );
};

const DurabiliteSection = () => {
  return (
    <section className="section-sdg bg-services lg:mt-20 sm:mt-14 mt-10 lg:py-20 sm:py-14 py-10" id="sdgs">
      <div className="container text-center lg:px-40">
        <span className="text-3xl font-semibold text-gray-900 dark:text-white text-center" style={{fontFamily: 'Quicksand, sans-serif'}} >Durabilité</span>
        <div className="grid lg:grid-cols-2 sm:grid-cols-2 lg:gap-[30px] gap-5 md:mt-10 mt-6">
          {data.map((item, index) => (
            <SDGItem data={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DurabiliteSection;
