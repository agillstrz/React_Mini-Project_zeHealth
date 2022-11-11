import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { getKeluhan } from "../graphql/Query";
import Loading from "./Loading/Loading";

function NavKeluhan() {
  const { data, loading } = useQuery(getKeluhan);

  return (
    <div className="my-5">
      <ul className="flex gap-2 justify-center">
        {data?.zeHealth_Keluhan.map((kel) => (
          <Link
            to={`/keluhan/${kel.id}`}
            key={kel.id}
            className="py-1 px-2 bg-color2 text-white rounded-lg hover:bg-color1 hover:text-color2 text-[15px] transition-all duration-150 ease-in-out"
          >
            {kel.keluhan}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default NavKeluhan;
