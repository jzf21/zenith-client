import React from 'react';
import ROption from './RecordingOptions';

const Sidebar = () => {
  return (
    <div className="h-screen w-72 flex flex-col justify-start items-center gap-4 ml-6">
      <ROption sessionTitle={"Interview with PM"} moreInfo={"Interview taken during christmas holidays"}/>
      <ROption sessionTitle={"Meeting with Opp"} moreInfo={"Taken on October Second sataurday"}/>
      <ROption sessionTitle={"Meeting Chief Justice"} moreInfo={"Interview press meet"}/>
    </div>
  );
};

export default Sidebar;

