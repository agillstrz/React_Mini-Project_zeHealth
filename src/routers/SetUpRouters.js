import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import DetailTransaksi from "../pages/Admin/DetailTransaksi";
import EditObat from "../pages/Admin/EditObat";
import LayoutAdmin from "../pages/Admin/LayoutAdmin";
import { ListObat } from "../pages/Admin/ListObat";
import TambahObat from "../pages/Admin/TambahObat";
import TransaksiAdmin from "../pages/Admin/TransaksiAdmin";
import NotFoundPage from "../pages/NotFoundPage";
import About from "../pages/User/About";
import { DetailObat } from "../pages/User/DetailObat";
import { FormPembayaran } from "../pages/User/FormPembayaran";
import GetSearch from "../pages/User/GetSearch";
import HomePage from "../pages/User/HomePage";
import KeluhanObat from "../pages/User/KeluhanObat";
import Layout from "../pages/User/Layout";
import SemuaObat from "../pages/User/SemuaObat";
import Transaksi from "../pages/User/Transaksi";

function SetUpRouters() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="Obat" element={<SemuaObat />} />
          <Route path="Keluhan/:id" element={<KeluhanObat />} />
          <Route path="Detail/:id" element={<DetailObat />} />
          <Route path="Pembayaran" element={<FormPembayaran />} />
          <Route path="transaksi" element={<Transaksi />} />
          <Route path="tentang" element={<About />} />
          <Route path="Search/:obat" element={<GetSearch />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="tambahObat" element={<TambahObat />} />
          <Route path="listObat" element={<ListObat />} />
          <Route path="transaksi" element={<TransaksiAdmin />} />
          <Route path="transaksi/detail" element={<DetailTransaksi />} />
          <Route path="edit" element={<EditObat />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default SetUpRouters;
