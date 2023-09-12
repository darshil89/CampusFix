import Image from "next/image";
import Carousel from "@/components/HomeComponents/Carousel/page";
import Card from "@/components/HomeComponents/Card/page";

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Card />
      <Carousel />
    </>
  );
}
