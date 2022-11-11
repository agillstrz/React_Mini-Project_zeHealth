import React from "react";
import obat1 from "../assets/image/obat1.png";
import obat2 from "../assets/image/obat2.png";
import obat3 from "../assets/image/obat3.png";
import obat4 from "../assets/image/obat4.png";

export const Hero = () => {
  return (
    <div className="h-screen flex items-center">
      <div className="hero-content flex justify-between ">
        <div className="w-[55%] h-full  ">
          <h1 className="font-extrabold text-6xl text-color2">
            Selamat Datang di ze<span className="text-color1">Health</span>
          </h1>
          <div className="text-md py-4 capitalize">
            <p className="font-semibold">
              cari obat dan sembuhkan penyakitmu sekarang!
            </p>
            <p>
              ingat! Orang yang mengabaikan kesehatan dirinya adalah orang yang
              menabung masalah untuk masa depannnya.
            </p>
          </div>
          {/* <button className="bg-color2 hover:bg-color1 hover:text-color2 transition-all duration-300 active:scale-90 font-bold text-white py-3 text-md px-7 rounded-full">
            Cari Obat
          </button> */}
        </div>
        <div className="w-[45%] z-50 h-full ">
          <div className="h-full">
            <div>
              <img
                className="absolute animate-bounce-3  top-80 right-40 h-52"
                src={obat1}
                alt=""
              />
              <img
                className="absolute animate-bounce-4 top-44 right-96 h-48"
                src={obat2}
                alt=""
              />
              <img
                className="absolute animate-bounce-1 top-80 right-96 h-52"
                src={obat3}
                alt=""
              />
              <img
                className="absolute animate-bounce-2 top-44 right-40 h-52"
                src={obat4}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
