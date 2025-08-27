'use client'

import Image from "next/image";
import Header from "../Common/Header";
import Settings from "./components/settings";
import Footer from "../Common/Footer";

export default function Home() {

  return (
    <>
      <Header />
      <Settings />
      <Footer />
    </>
  );
}
