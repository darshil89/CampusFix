"use client";
import Image from "next/image";
import { useEffect } from "react";
import Carousel from "@/components/HomeComponents/Carousel/page";
import Card from "@/components/HomeComponents/Card/page";
import { toast } from "react-toastify";
export default function Home() {
  useEffect(() => {
    toast.success("Welcome to the DSCE", {
      position: "top-right",
      autoClose: 5000,
    });
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <Card />
      <Carousel />
    </>
  );
}
