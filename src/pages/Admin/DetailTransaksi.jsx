import { useLazyQuery } from "@apollo/client";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../component/Loading/Loading";
import { statusPembayaran } from "../../graphql/Mutations";
import { detailTransaksi } from "../../graphql/Query";
import { MutationDatas } from "../../utils/hooks";

function DetailTransaksi() {
  let navigate = useNavigate();
  let id = useLocation();
  const [transaksi, { data, loading, error }] = useLazyQuery(detailTransaksi);
  const [status, setStatus] = useState(null);
  const { actions: Konfirmasi, loading: loadKonfirmasi } =
    MutationDatas(statusPembayaran);
  const pemesan = data?.zeHealth_Pemesan_by_pk;

  const konfirmasiPembayaran = (e, idx) => {
    e.preventDefault();
    Konfirmasi({
      variables: {
        kode_pemesanan: idx,
        status_pembayaran: status,
      },
    });

    navigate("/admin/transaksi");
  };
  useEffect(() => {
    transaksi({
      variables: {
        kode_pemesanan: id.state,
      },
    });
  }, []);
  if (loading || loadKonfirmasi) {
    return (
      <div className=" absolute flex justify-center right-0 left-72 top-0 bottom-0  ">
        <Loading name="Health" />
      </div>
    );
  }
  return (
    <div className="content-side ">
      <div className=" pt-6">
        <h1 className="text-center text-4xl font-bold  text-black">
          Detail Transaksi
        </h1>
        <div className="grid p-3  gap-8 grid-cols-2 bg-white shadow-xl">
          <div className="p-12">
            <p className="p-2 font-bold">
              Nama Pembeli : {pemesan?.Nama_Pembeli}
            </p>
            <p className="p-2  font-bold">Nomor Hp : {pemesan?.noHp}</p>
            <p className="p-2  font-bold">Nama Obat: {pemesan?.obat}</p>
            <p className="p-2  font-bold">Total Obat: {pemesan?.total_obat}</p>
            <p className="p-2  font-bold">
              Total harga: <FormatRupiah value={pemesan?.total_harga} />{" "}
            </p>
            <p className="p-2  font-bold">
              Metode pembayaran : {pemesan?.Metode_pembayaran}{" "}
            </p>
          </div>
          <div>
            <figure>
              <figcaption className="text-sm">Bukti Pembayaran</figcaption>
              <img
                className="w-56"
                src={pemesan?.bukti}
                alt="bukti-Pembayaran"
              />
            </figure>

            <p className="p-2">
              status pembayaran:{" "}
              {`${pemesan?.status_pembayaran ? "Selesai" : "Menunggu"}`}
            </p>
            <div className="flex  gap-2">
              <label className="p-2" htmlFor="">
                Pembayaran :
              </label>

              <select
                onChange={(e) => setStatus(e.target.value)}
                className=" select w-32   rounded-sm  "
              >
                <option disabled selected>
                  Status...
                </option>
                <option value="false">
                  Menunggu <i className="fa-solid fa-hourglass-start"></i>
                </option>
                <option value="true">
                  Selesai <i className="fa-solid fa-check"></i>
                </option>
              </select>
            </div>

            <button
              className="zbtn"
              onClick={(e) => konfirmasiPembayaran(e, pemesan?.kode_pemesanan)}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailTransaksi;
