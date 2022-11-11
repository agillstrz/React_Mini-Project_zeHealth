import { useQuery } from "@apollo/client";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../component/Loading/Loading";
import { getObat, Pemesan } from "../../graphql/Query";

function Dashboard() {
  let navigate = useNavigate();
  let params = useLocation();
  const { data, loading } = useQuery(getObat);
  const { data: pemesan, loading: loadPemesan } = useQuery(Pemesan);
  if (loading || loadPemesan) {
    return (
      <div className=" absolute flex justify-center right-0 left-72 top-0 bottom-0  ">
        <Loading name="Health" />
      </div>
    );
  }
  let obat = data?.zeHealth_obat.map((m) => m.id);
  const totalObat = obat.length;
  const Harga = pemesan?.zeHealth_Pemesan.map((m) => m.total_harga);
  const totalHarga = Harga.reduce((a, b) => a + b, 0);
  return (
    <div className="absolute flex justify-center right-0 left-72 top-20">
      <div>
        <h1 className="text-5xl font-extrabold  text-center">
          Dashboard Admin
        </h1>
        <div className="flex gap-3 mt-10 flex-wrap">
          <div className="card w-96 bg-base-300 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Obat</h2>
              <p>{totalObat} Obat tersedia</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => navigate("/admin/transaksi")}
                  className="zbtn"
                >
                  💊Obat
                </button>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-300 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Pemasukan</h2>
              <p>
                {" "}
                +<FormatRupiah value={totalHarga} />{" "}
              </p>
              <div className="card-actions justify-end">
                <button className="zbtn">💵Pendapatan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
