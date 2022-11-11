import { useLazyQuery } from "@apollo/client";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../component/Loading/Loading";
import { getObatById } from "../../graphql/Query";

export const DetailObat = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [detailObat, { data, loading, error }] = useLazyQuery(getObatById);
  useEffect(() => {
    detailObat({
      variables: {
        id: id,
      },
    });
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading name="Detail" />
      </div>
    );
  }

  const obat = data?.zeHealth_obat[0];
  const beliSekarang = (e) => {
    e.preventDefault();
    navigate("/pembayaran", { state: data });
  };
  return (
    <div className="pt-28 min-h-screen">
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-center text-lg ">{obat?.nama_obat}</h3>
          <p className="py-2">
            {" "}
            <span className="font-semibold">Dosis Obat</span> : {obat?.dosis}
          </p>
          <p className="py-2">
            <span className="font-semibold">Aturan Pakai</span> : {obat?.aturan}
          </p>
          <div className="modal-action ">
            <label htmlFor="my-modal" className="zbtn cursor-pointer">
              tutup
            </label>
          </div>
        </div>
      </div>
      <div className="hero">
        <div className="flex w-full px-16 gap-6">
          <div className="w-[40%]  flex justify-end  ">
            <img
              src={obat?.foto_obat}
              className="w- rounded-lg shadow-2xl  border border-color1"
            />
          </div>

          <div className="w-1/2 px-2">
            <h1 className="text-5xl font-bold">{obat?.nama_obat}</h1>
            <p className="py-6 lowercase">{obat?.deskripsi_obat}</p>
            <p>Keluhan : {obat?.obat_to_keluhan.keluhan} </p>
            <p>Stok : {obat?.stok_obat}</p>
            <p className="text-color1 text-lg font-bold">
              <FormatRupiah value={data?.zeHealth_obat[0].harga_obat} />
            </p>
            <p className="mt-2 flex gap-x-3">
              <span
                className={`${
                  obat?.stok_obat <= 0
                    ? "  bg-color2 text-white"
                    : " bg-black/90  text-white"
                }   p-1 text-md  rounded-lg `}
              >
                Tersedia
              </span>
              <label
                htmlFor="my-modal"
                className="p-1 cursor-pointer hover:bg-primary hover:text-color2 transition duration-150 ease-linear text-md bg-color2 text-white rounded-lg"
              >
                Informasi
              </label>
            </p>
            <button
              onClick={beliSekarang}
              className="bg-color2 my-5 hover:bg-color1 hover:text-color2 transition-all duration-300 active:scale-90 font-bold text-white py-3 text-md px-7 rounded-full"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
