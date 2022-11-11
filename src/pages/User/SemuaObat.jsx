import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import CardObat from "../../component/CardObat";
import Loading from "../../component/Loading/Loading";
import NavKeluhan from "../../component/NavKeluhan";
import { getObat } from "../../graphql/Query";

const SemuaObat = () => {
  const [Obat, { data, loading, error }] = useLazyQuery(getObat);
  const [jumlah, setJumlah] = useState(10);
  useEffect(() => {
    Obat({
      variables: {
        limit: jumlah,
      },
    });
  }, [jumlah]);
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading name="Obat" />
      </div>
    );
  }

  return (
    <div className="pt-28 content ">
      <h1 className="text-5xl font-extrabold text-center">Semua Obat</h1>
      <NavKeluhan />
      <div className="grid grid-cols-5 gap-y-5 gap-x-2">
        {data?.zeHealth_obat.map((obat) => (
          <CardObat
            key={obat.id}
            id={obat.id}
            name={obat.nama_obat}
            harga={obat.harga_obat}
            keluhan={obat.obat_to_keluhan?.keluhan}
            stok={obat.stok_obat}
            foto={obat.foto_obat}
            dosis={obat.dosis}
            aturan={obat.aturan}
            deskripsi={obat.deskripsi_obat}
          />
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => setJumlah(jumlah + 10)}
          className="bg-color2 my-5 group hover:bg-color1 hover:text-color2 transition-all duration-150 ease-in-out hover:scale-105 font-bold text-white py-3  px-7 rounded-lg"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default SemuaObat;
