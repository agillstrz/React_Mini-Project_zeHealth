import React from "react";

const NotFoundPage = () => {
  return (
    <div className="relative h-screen">
      <img
        className="w-full absolute -top-24 "
        src={require("../assets/image/notfound.png")}
        alt=""
      />
    </div>
  );
};

export default NotFoundPage;
