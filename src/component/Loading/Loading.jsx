import React from "react";
import "./loading.css";

function Loading({ name }) {
  return (
    <div className="h-screen flex items-center ">
      <h1 className="typing font-bold text-3xl">
        ze<span className="text-color1">{name}...</span>
      </h1>
    </div>
  );
}

export default Loading;
