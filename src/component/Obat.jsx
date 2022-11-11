import React from "react";
import { useNavigate } from "react-router-dom";
import CardObat from "./CardObat";

const Obat = ({ obat }) => {
  let navigate = useNavigate();

  return (
    <div className="capitalize py-8">
      <h2 className="font-bold text-5xl py-3">Obat💊</h2>
      <div className="grid grid-cols-5 gap-2">
        {obat?.zeHealth_obat.map((obat) => (
          <CardObat
            key={obat.id}
            id={obat.id}
            name={obat.nama_obat}
            harga={obat.harga_obat}
            keluhan={obat.obat_to_keluhan?.keluhan}
            stok={obat.stok_obat}
            foto={obat.foto_obat}
            deskripsi={obat.deskripsi_obat}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/Obat")}
          className="bg-color2 my-5 group hover:bg-color1 hover:text-color2 transition-all duration-150 ease-in-out hover:scale-105 font-bold text-white py-3  px-7 rounded-lg"
        >
          Lihat Semua Obat{" "}
        </button>
      </div>
    </div>
  );
};

export default Obat;
