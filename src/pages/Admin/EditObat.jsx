import { useQuery } from "@apollo/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { storage } from "../../config/firebase";
import { updateObat } from "../../graphql/Mutations";
import { getKeluhan } from "../../graphql/Query";
import { MutationDatas } from "../../utils/hooks";
const EditObat = () => {
  let idx = useLocation();
  const {
    id,
    nama_obat,
    harga_obat,
    obat_to_keluhan,
    deskripsi_obat,
    foto_obat,
    stok_obat,
    aturan,
    dosis,
  } = idx.state;

  let navigate = useNavigate();
  const { actions: UpdateObat, loading } = MutationDatas(updateObat);
  const { data } = useQuery(getKeluhan);
  const [obat, setObat] = useState({
    id: id,
    nama: nama_obat,
    keluhan: obat_to_keluhan?.keluhan,
    deskripsi: deskripsi_obat,
    harga: harga_obat,
    stok: stok_obat,
    foto: foto_obat,
    aturan: aturan,
    dosis: dosis,
  });
  const handleImage = (e) => {
    const imageUpload = e.target.files[0];
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
  const obatUpdate = (obatBaru) => {
    UpdateObat({
      variables: obatBaru,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, nama, deskripsi, harga, foto, keluhan, aturan, dosis, stok } =
      obat;
    const obatBaru = {
      id: id,
      id_keluhan: keluhan,
      nama_obat: nama,
      deskripsi_obat: deskripsi,
      harga_obat: harga,
      foto_obat: foto,
      stok_obat: stok,
      dosis: dosis,
      aturan: aturan,
    };
    obatUpdate(obatBaru);
    navigate("/admin/listObat");
  };
  console.log(obat.keluhan);
  return (
    <div className="content-side top-12">
      <div className=" w-[75%] shadow-lg bg-white border  border-color2 text-color2 ">
        <div className="bg-color2 p-3 relative">
          <h1 className="text-center text-4xl font-bold  text-white">
            Edit Obat
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
                  value={obat.nama}
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
                  value={obat.stok}
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
                  value={obat.dosis}
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
                  <option disabled select>
                    Pilih keluhan
                  </option>
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
                  value={obat.harga}
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
                  value={obat.aturan}
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
                  value={obat.deskripsi}
                  placeholder="Nama Obat..."
                  className="textarea h-2"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="zbtn">SUBMIT</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditObat;
