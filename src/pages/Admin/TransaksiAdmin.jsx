import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/Loading/Loading";
import { pemesan } from "../../graphql/Subscriptions";
import { SubscriptionDatas } from "../../utils/hooks";

function TransaksiAdmin() {
  let navigate = useNavigate();
  const { data, loading, error } = SubscriptionDatas(pemesan);
  const lihatPesanan = (id, e) => {
    e.preventDefault();
    navigate("/admin/transaksi/detail", { state: id });
  };

  if (loading) {
    return (
      <div className=" absolute flex justify-center right-0 left-72 top-0 bottom-0  ">
        <Loading name="Health" />
      </div>
    );
  }

  return (
    <>
      <div className="content-side top-20">
        <div>
          <h1 className="text-5xl font-extrabold text-center">Transaksi</h1>
          <table className="table table-auto w-full mt-5">
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>Nama Pembeli</th>
                <th>Metode Pembayaran</th>
                <th>Harga</th>
                <th>Status Pembayaran</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {data?.zeHealth_Pemesan.map((p, index) => (
                <tr className="text-center" key={p.kode_pemesanan}>
                  <th>{++index}</th>
                  <td>{p.Nama_Pembeli}</td>
                  <td>{p.Metode_pembayaran}</td>
                  <td>
                    <FormatRupiah value={p.total_harga} />
                  </td>

                  <td>{`${p.status_pembayaran ? "Berhasil" : "Menunggu"}`}</td>
                  <td>
                    <button
                      onClick={(e) => lihatPesanan(p.kode_pemesanan, e)}
                      className="btn btn-primary"
                    >
                      Lihat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TransaksiAdmin;
