import React from "react";

const FocusArea = ({}) => {
  return (
    <div className="h-full w-full border-2 border-zenith-lav flex flex-col justify-start items-center gap-4">
      <div className="h-1/5">
        <div className="text-4xl">Inteview with PM</div>
      </div>
      <div className="h-1 w-3/5 bg-zenith-lav"></div>
      <div>
        <p className="text-2xl">Interview taken during christmas holidays</p>
        <p>
          PM talking about the increasing gas prices and how it is affecting the
          economy
        </p>
      </div>
    </div>
  );
};

export default FocusArea;
