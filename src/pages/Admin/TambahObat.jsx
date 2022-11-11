import { useQuery } from "@apollo/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { storage } from "../../config/firebase";
import { tambahObat } from "../../graphql/Mutations";
import { getKeluhan } from "../../graphql/Query";
import { MutationDatas } from "../../utils/hooks";
const TambahObat = () => {
  let navigate = useNavigate();
  const { actions: insertObat, loading } = MutationDatas(tambahObat);
  const [btn, setBtn] = useState(true);

  const { data } = useQuery(getKeluhan);
  const [obat, setObat] = useState({
    nama: "",
    keluhan: 0,
    deskripsi: "",
    harga: 0,
    stok: 0,
    foto: null,
    aturan: "",
    dosis: "",
  });
  const handleImage = (e) => {
    const imageUpload = e.target.files[0];
    if (!imageUpload) return;
    const storageRef = ref(storage, `obat/${imageUpload.name + v4()}`);
    uploadBytes(storageRef, imageUpload).then(() => {
      getDownloadURL(storageRef).then((url) => {
        setObat({ ...obat, foto: url });
      });
    });
  };

  const onChange = (e) => {
    setObat({
      ...obat,
      [e.target.name]: e.target.value,
    });
  };

  const tambahObatt = (obatBaru) => {
    insertObat({
      variables: obatBaru,
    });
  };

  useEffect(() => {
    if (obat.foto !== null) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [obat]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const { nama, deskripsi, harga, foto, keluhan, stok, dosis, aturan } = obat;
    const obatBaru = {
      id_keluhan: keluhan,
      nama_obat: nama,
      deskripsi_obat: deskripsi,
      harga_obat: harga,
      foto_obat: foto,
      stok_obat: stok,
      dosis: dosis,
      aturan: aturan,
    };
    tambahObatt(obatBaru);
    navigate("/admin/listObat");
  };
  return (
    <>
      <div className="content-side top-12">
        <div className=" w-[75%] shadow-lg bg-white border  border-color2 text-color2 ">
          <div className="bg-color2 p-3 relative">
            <h1 className="text-center text-4xl font-bold  text-white">
              Tambahkan Obat
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex p-4 gap-4">
              <div className="flex  w-1/2 gap-3 flex-wrap  justify-center">
                <div className="form-control w-full max-w-xs">
                  <label className="label m-auto pb-1 ">
                    <span className=" text-color2 text-lg">Nama Obat</span>
                  </label>
                  <input
                    onChange={onChange}
                    type="text"
                    name="nama"
                    placeholder="Nama Obat..."
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label m-auto pb-1">
                    <span className=" text-color2 text-lg">stok</span>
                  </label>
                  <input
                    type="number"
                    onChange={onChange}
                    name="stok"
                    placeholder="stok..."
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label m-auto pb-1">
                    <span className=" text-color2 text-lg">Dosis</span>
                  </label>
                  <input
                    type="text"
                    onChange={onChange}
                    name="dosis"
                    placeholder="Dosis..."
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label m-auto pb-1">
                    <span className=" text-color2 text-lg">Keluhan</span>
                  </label>
                  <select
                    onChange={onChange}
                    name="keluhan"
                    className="select w-full max-w-xs"
                  >
                    {data?.zeHealth_Keluhan.map((kel) => (
                      <option key={kel.id} value={kel.id}>
                        {kel.keluhan}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex  w-1/2 gap-3 flex-wrap  justify-center">
                <div className="form-control w-full max-w-xs">
                  <label className="label m-auto pb-1 ">
                    <span className=" text-color2 text-lg">Harga Obat</span>
                  </label>
                  <input
                    onChange={onChange}
                    type="text"
                    name="harga"
                    placeholder="Nama Obat..."
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label m-auto pb-1 ">
                    <span className=" text-color2 text-lg">Aturan Pakai</span>
                  </label>
                  <input
                    onChange={onChange}
                    type="text"
                    name="aturan"
                    placeholder="Aturan Pakai"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label m-auto pb-1 ">
                    <span className=" text-color2 text-lg">Foto</span>
                  </label>
                  <input onChange={handleImage} type="file" name="foto" />
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label m-auto pb-1 ">
                    <span className=" text-color2 text-lg">Deskripsi Obat</span>
                  </label>

                  <textarea
                    type="text"
                    onChange={onChange}
                    name="deskripsi"
                    placeholder="Nama Obat..."
                    className="textarea h-2"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex py-2 justify-center">
              <button disabled={btn} className={`${!btn ? "zbtn" : " btn"}`}>
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TambahObat;
