import React from "react";
import { Hero } from "../../component/Hero";
import { Keluhan } from "../../component/Keluhan";
import Loading from "../../component/Loading/Loading";
import Obat from "../../component/Obat";
import { getObatLimit } from "../../graphql/Subscriptions";
import { SubscriptionDatas } from "../../utils/hooks";

function HomePage() {
  const { data, loading, error } = SubscriptionDatas(getObatLimit);
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading name="Health" />
      </div>
    );
  }

  return (
    <div className="content">
      <Hero />
      <Keluhan />
      <Obat obat={data} />
    </div>
  );
}

export default HomePage;
