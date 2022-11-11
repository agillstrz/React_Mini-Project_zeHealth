import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  let navigate = useNavigate();
  return (
    <div className="flex fixed  h-screen  flex-col  p-3 bg-color2  shadow w-80">
      <div className="space-y-3">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/admin")}
            className="text-white  font-bold w-full text-2xl"
          >
            zeHealth
          </button>
        </div>
        <div className="relative"></div>
        <div className="flex-1">
          <ul className="menu space-y-1 text-md  text-color1">
            <li className="">
              <Link to="/admin">
                <i className="fa-solid fa-box-archive"></i>Dashboard
              </Link>
            </li>
            <li className="">
              <Link to="listObat">
                {" "}
                <i className="fa-solid fa-list"></i>List Obat
              </Link>
            </li>
            <li>
              <Link to="transaksi">
                <i className="fa-solid fa-money-bill-wave"></i>Transaksi
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="fa-solid fa-house"></i>Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
