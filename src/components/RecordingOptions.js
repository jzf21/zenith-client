// Recording Option.js
import React from "react";

const ROption = ({ sessionTitle, moreInfo }) => {
  return (
    <div className="w-full h-20 px-4 flex flex-col justify-center items-start border-2 border-zenith-lav">
      <p className="font-bold">{sessionTitle}</p>
      <p className="text-sm">{moreInfo}</p>
    </div>
  );
};

export default ROption;
