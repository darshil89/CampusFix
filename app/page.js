"use client";
import Image from "next/image";
import { useEffect } from "react";
import Carousel from "@/components/HomeComponents/Carousel/page";
import Card from "@/components/HomeComponents/Card/page";
import Footer from "@/components/footer/footer";
// import Footer from "@/components/HomeComponents/Footer/page";
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
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9776447765416!2d77.5665551!3d12.909158299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae156310100001%3A0x71be53da4480fbbe!2sDayananda%20Sagar%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1690959137087!5m2!1sen!2sin"
        style={{ border: 0 }}
        height={300}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full mb-10"
      ></iframe>
      <Footer />
    </>
  );
}
