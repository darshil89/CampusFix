"use client";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const id = params.problemId;

  return <h1>My Problem: {id}</h1>;
}
