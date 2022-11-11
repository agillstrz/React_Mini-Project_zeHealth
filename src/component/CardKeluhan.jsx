import React from "react";
import { Link } from "react-router-dom";
import foto from "../assets/image/demam.png";

const Card = ({ keluhan, id }) => {
  return (
    <Link to={`keluhan/${id}`}>
      <div className="shadow-md hover:shadow-xl w-56 h-60 rounded-lg overflow-hidden bg-white">
        <img className="h-[75%] w-full" src={foto} alt="" />
        <div className=" h-[25%] flex justify-center items-center  font-bold">
          <p>{keluhan}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
