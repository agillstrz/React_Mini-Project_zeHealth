import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { Link } from "react-router-dom";
const CardObat = ({
  name,
  harga,
  keluhan,
  stok,
  id,
  foto,
  dosis,
  aturan,
  deskripsi,
}) => {
  return (
    <>
      <Link to={`/Detail/${id}`}>
        <div className="shadow-md relative hover:shadow-xl bg-white group w-56 p-2 h-80 rounded-lg overflow-hidden">
          <img className="h-[70%] w-full" src={foto} alt="obat" />
          <div className=" h-[30%] px-2 flex flex-col  justify-center">
            <p className="font-extrabold  text-md">{name}</p>
            <p className="text-color2 text-[12px]">{keluhan}</p>
            <p className="text-color1 text-md font-bold">
              {" "}
              <FormatRupiah value={harga} />{" "}
            </p>
          </div>
          <span
            className={`${
              stok <= 0
                ? "  bg-color2 text-white"
                : " bg-black font-semibold  text-white"
            } absolute right-0 m-1 top-0 p-1 text-[10px]  rounded-lg `}
          >
            {`${stok <= 0 ? "Obat Habis" : " Tesedia"}`}
          </span>
        </div>
      </Link>
    </>
  );
};

export default CardObat;
