import React from "react";
import zehealth from "../../assets/image/zehealth.png";
import foto from "../../assets/image/obat.jpg";
const About = () => {
  return (
    <div className=" pt-28 content">
      <div className="grid grid-cols-2 place-items-center pt-5">
        <div className="col-span-2 w-full flex justify-start">
          <div className="w-1/2">
            <h1 className="font-extrabold text-5xl text-center text-color2">
              Apa itu ze<span className="text-color1">Health?</span>
            </h1>
          </div>
        </div>
        <div className="col-span-2 w-full flex justify-end">
          <div className="w-1/2 ">
            <p className="text-[23px] text-justify text-color2">
              <span className="font-bold">ze</span>
              <span className="text-color1 font-bold">Health</span> adalah
              sebuah wadah bagi semua orang untuk membeli obat dengan penyakit
              yang paling sering dikeluhkan.
            </p>
          </div>
        </div>
        <div className="col-span-2 w-full mt-5 flex justify-start">
          <div className="w-1/2 flex justify-center  ">
            <img className="h-72 " src={foto} alt="" />
          </div>
        </div>
        <div className="col-span-2  w-full flex pt-5 justify-end">
          <div className="w-1/2 flex justify-center">
            <h1 className="font-extrabold text-5xl text-center text-color2">
              kenapa harus ze<span className="text-color1">Health?</span>
            </h1>
          </div>
        </div>
        <div className="col-span-2 mt-5 w-full flex justify-start">
          <div className="w-1/2 flex justify-center  ">
            <p className="text-[23px]  text-justify text-color2">
              Karena dengan <span className="font-bold">ze</span>
              <span className="text-color1 font-bold">Health</span> Semua orang
              tidak perlu lagi kebingungan untuk memilih dan mengantri di apotek
              untuk membeli obat yang diinginkan. Dengan{" "}
              <span className="font-bold">ze</span>
              <span className="text-color1">Health</span> semuanya menjadi lebih
              praktis.
            </p>
          </div>
          <div className="w-1/2 flex justify-center  ">
            <img className="h-80 w-96 " src={zehealth} alt="" />
          </div>
        </div>
        <div className="col-span-2 w-full mt-5 flex justify-end"></div>
      </div>
    </div>
  );
};

export default About;
