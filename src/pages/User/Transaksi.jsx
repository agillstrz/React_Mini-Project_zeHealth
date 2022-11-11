import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import Moment from "react-moment";
import Loading from "../../component/Loading/Loading";
import { pemesan } from "../../graphql/Subscriptions";
import { SubscriptionDatas } from "../../utils/hooks";
function Transaksi() {
  const { data, loading, error } = SubscriptionDatas(pemesan);
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading name="Transaksi" />
      </div>
    );
  }
  const datas = data?.zeHealth_Pemesan.sort();
  console.log(datas);
  return (
    <div className="pt-28 content min-h-screen">
      <h1 className="text-4xl font-extrabold text-center">
        Transaksi dan Antrian Pengambilan Obat
      </h1>
      <table className="table table-auto w-full mt-5">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pembeli</th>
            <th>Metode Pembayaran</th>
            <th>Obat</th>
            <th>Harga Total</th>
            <th>Tanggal Beli</th>
            <th>Status Pembayaran</th>
          </tr>
        </thead>
        <tbody>
          {data?.zeHealth_Pemesan.map((p, index) => (
            <tr key={p.kode_pemesanan}>
              <th>{++index}</th>
              <td>{p.Nama_Pembeli}</td>
              <td>{p.Metode_pembayaran}</td>
              <td>{p.obat}</td>
              <td>
                <FormatRupiah value={p.total_harga} />
              </td>
              <td>
                <Moment format="D MMM YYYY hh:mm:ss">
                  {p.tanggal_pembelian}
                </Moment>
              </td>{" "}
              <td
                className={`${
                  p.status_pembayaran ? "text-color2 font-bold" : "text-color1"
                }`}
              >
                <label className="btn btn-primary disabled">
                  {" "}
                  {`${p.status_pembayaran ? "Ambil Obat" : "Menunggu"}`}{" "}
                  <i
                    className={`fa-solid  ${
                      p.status_pembayaran
                        ? "fa-check"
                        : "fa-circle-notch animate-spin"
                    }`}
                  ></i>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transaksi;
