import Image from "next/image";

import Carousel from "@/components/HomeComponents/Carousel/page";
import Card from "@/components/HomeComponents/Card/page";
import Footer from "@/components/footer/footer";
import Map from "./(HOME)/map/page";
import Details from "./(HOME)/details/page";

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Details />

      <Map />
    </>
  );
}
