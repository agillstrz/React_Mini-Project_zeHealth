import { useQuery } from "@apollo/client";
import React from "react";
import { getKeluhan } from "../graphql/Query";
import CardKeluhan from "./CardKeluhan";
import Loading from "./Loading/Loading";

export const Keluhan = () => {
  const { data, loading, error } = useQuery(getKeluhan);

  return (
    <div className="capitalize">
      <h2 className="font-bold text-5xl py-3">Keluhan😷</h2>
      <div className="flex justify-between flex-wrap gap-y-5 ">
        {data?.zeHealth_Keluhan.map((kel) => (
          <div key={kel.id}>
            <CardKeluhan id={kel.id} keluhan={kel.keluhan} />
          </div>
        ))}
      </div>
    </div>
  );
};
