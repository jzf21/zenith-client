import React from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import Navbar from "./Navbar";

const DefaultLayout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DefaultLayout;
