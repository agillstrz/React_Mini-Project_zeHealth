import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CardObat from "../../component/CardObat";
import Loading from "../../component/Loading/Loading";
import Navkeluhan from "../../component/NavKeluhan";
import { getKeluhanObat } from "../../graphql/Query";

function KeluhanObat() {
  const { id } = useParams();
  const [detailObat, { data, loading, error }] = useLazyQuery(getKeluhanObat);

  useEffect(() => {
    detailObat({
      variables: {
        id: id,
      },
    });
  }, [id]);
  const keluhan = data?.zeHealth_Keluhan[0].keluhan_to_obat;
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading name="Keluhan" />
      </div>
    );
  }

  return (
    <div className="pt-28 content min-h-screen">
      <h1 className="text-5xl font-extrabold text-center">
        {data?.zeHealth_Keluhan[0].keluhan}
      </h1>
      <Navkeluhan />
      <div className="grid grid-cols-5 gap-y-5 gap-x-2">
        {keluhan == 0 ? (
          <div className="w-full">
            <h1 className="text-center text-xl">belum ada obat🥶....</h1>
          </div>
        ) : (
          keluhan &&
          keluhan.map((obat) => (
            <CardObat
              key={obat.id}
              id={obat.id}
              name={obat.nama_obat}
              harga={obat.harga_obat}
              keluhan={obat.obat_to_keluhan.keluhan}
              stok={obat.stok_obat}
              foto={obat.foto_obat}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default KeluhanObat;
