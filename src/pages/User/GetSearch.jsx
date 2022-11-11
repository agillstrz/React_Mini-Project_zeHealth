import { useLazyQuery } from "@apollo/client";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CardObat from "../../component/CardObat";
import Loading from "../../component/Loading/Loading";
import { searchObat } from "../../graphql/Query";

function GetSearch() {
  const { obat } = useParams();
  const [cariObat, { data, loading }] = useLazyQuery(searchObat);

  useEffect(() => {
    cariObat({
      variables: {
        deskripsi_obat: `%${obat}%`,
      },
    });
  }, [obat]);
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading name="Cari" />
      </div>
    );
  }
  return (
    <div className="pt-28 content min-h-screen">
      <h1 className="text-5xl font-extrabold text-center mb-5">{obat}🔍</h1>
      <div className="grid grid-cols-5 gap-y-5 gap-x-2">
        {data?.zeHealth_obat == 0 ? (
          <h1 className="text-xl text-center col-span-5 mt-5">
            <span className="animate-pulse">Ups🤫!</span> Nama obat yang dicari
            tidak ditemukan...
          </h1>
        ) : (
          data?.zeHealth_obat.map((obat) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default GetSearch;
