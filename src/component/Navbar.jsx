import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let link = useLocation();
  let navigate = useNavigate();
  const [scroll, setSroll] = useState(false);
  const [namaObat, setNamaObat] = useState("");
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.pageYOffset > 0 ? setSroll(true) : setSroll(false);
    });
  });

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`Search/${namaObat}`);
  };

  return (
    <>
      <div
        className={`${
          scroll ? " bg-white" : "shadow-lg"
        } navbar fixed content py-2 transition-all duration-300 ease-in-out z-50  text-color1`}
      >
        <div className="navbar-start">
          <Link to="/" className=" text-3xl font-extrabold">
            <span className="text-color2">ze</span>Health
          </Link>
        </div>
        <div className="navbar-center w-[40%] ">
          <ul className="menu menu-horizontal p-0  w-full">
            <div className="form-control w-full">
              <form className="" onSubmit={handleSearch}>
                <input
                  onChange={(e) => setNamaObat(e.target.value)}
                  type="text"
                  value={namaObat}
                  onMouseDown={() => setNamaObat("")}
                  placeholder="Cari Obat...."
                  className="input rounded-lg h-9 w-full input-bordered"
                />
              </form>
            </div>
          </ul>
        </div>
        <ul className="navbar-end text-[19px] py-3  ">
          <NavLink
            className={`${
              link.pathname === "/Obat" ? "font-extrabold " : ""
            } px-3 hover:font-bold`}
            to="Obat"
          >
            Semua Obat
          </NavLink>
          <NavLink
            className={`${
              link.pathname === "/transaksi" ? "font-extrabold " : ""
            } px-3 hover:font-bold `}
            to="transaksi"
          >
            Transaksi
          </NavLink>
          <NavLink
            className={`${
              link.pathname === "/tentang" ? "font-extrabold " : ""
            } px-3 hover:font-bold `}
            to="tentang"
          >
            Tentang
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
