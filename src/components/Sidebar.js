import React from 'react';
import ROption from './RecordingOptions';

const Sidebar = () => {
  return (
    <div className="h-screen w-72 flex flex-col justify-start items-center gap-4 ml-6">
      <ROption />
      <ROption />
      <ROption />
      <ROption />
      <ROption />
      <ROption />
    </div>
  );
};

export default Sidebar;

