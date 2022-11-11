import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/Loading/Loading";
import { hapusObat } from "../../graphql/Mutations";
import { getObatSubs } from "../../graphql/Subscriptions";
import { MutationDatas, SubscriptionDatas } from "../../utils/hooks";

export const ListObat = () => {
  let navigate = useNavigate();
  const { data, loading, error } = SubscriptionDatas(getObatSubs);
  const { actions: deleteObat, loading: loadHapus } = MutationDatas(hapusObat);

  if (loading || loadHapus) {
    return (
      <div className=" absolute flex justify-center right-0 left-72 top-0 bottom-0  ">
        <Loading name="Health" />
      </div>
    );
  }

  const hapusObats = (idx) => {
    deleteObat({
      variables: { id: idx },
    });
  };

  return (
    <div className="content-side top-20 min-h-screen px-14 ">
      <div>
        <h1 className="text-5xl font-extrabold text-center">Daftar Obat</h1>
        <button onClick={() => navigate("/admin/tambahObat")} className="zbtn">
          Tambah Obat+
        </button>
        <table className="table w-full   ">
          <thead>
            <tr className="text-center">
              <th>No</th>
              <th>Nama</th>
              <th>Foto</th>
              <th>Keluhan</th>
              <th>Harga</th>
              <th>Stok Obat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data?.zeHealth_obat.map((obat, index) => (
              <tr key={obat.id}>
                <th>{++index}</th>
                <td className="">
                  <p>{obat.nama_obat}</p>
                </td>
                <td>
                  <img className="w-14" src={obat.foto_obat} alt="" />
                </td>
                <td>{obat.obat_to_keluhan?.keluhan}</td>
                <td>
                  <FormatRupiah value={obat.harga_obat} />
                </td>
                <td>{obat.stok_obat}</td>
                <td>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => navigate("/admin/edit", { state: obat })}
                      className="py-2 px-4 bg-color2 hover:bg-color1 hover:text-color2 text-white rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => hapusObats(obat.id)}
                      className="py-2 px-4 bg-color1 hover:bg-color2 hover:text-color1 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
