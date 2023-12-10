import React from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import Navbar from "./Navbar";

const DefaultLayout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="pt-20">{children}</div>
    </>
  );
};

export default DefaultLayout;
