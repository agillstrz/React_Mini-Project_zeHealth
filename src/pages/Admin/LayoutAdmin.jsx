import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../component/SideBar";

function LayoutAdmin() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}

export default LayoutAdmin;
