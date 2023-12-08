"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import Card from "@/components/HomeComponents/Card/page";

export default function Problem({ params: { id } }) {
  const [problem, setProblem] = useState(null);
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();

  console.log("id of particular problem= ", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch problem data
        const baseUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://dayanand.vercel.app";
        const problemRes = await fetch(`${baseUrl}/api/problem/${id}`, {
          cache: "no-cache",
        });

        if (!problemRes.ok) {
          throw new Error("Problem not found");
        }

        const problemData = await problemRes.json();
        setProblem(problemData);

        // Fetch user data

        const userRes = await fetch(
          `${baseUrl}/api/user/${problemData.problem.userId}`,
          {
            cache: "no-cache",
          }
        );

        if (!userRes.ok) {
          throw new Error("User not found");
        }

        const userData = await userRes.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  if (session) {
    if (!problem || !user) {
      return <SyncLoader className="text-center mt-10" color="#2e3634" />;
    }

    const {
      title,
      content,
      floorNumber,
      roomNumber,
      buildingNumber,
      createdAt,
      image,
    } = problem.problem;

    const { name, email } = user.user;

    return (
      <>
        <div className="flex justify-around items-center h-screen md:w-4/4 md:mx-auto ">
          <Card
            title={title}
            email={email}
            userName={name}
            content={content}
            problemId={id}
            buildingnumber={buildingNumber}
            floornumber={floorNumber}
            roomnumber={roomNumber}
            createdAt={createdAt}
            image={image}
          />
        </div>
      </>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">You are not logged in</div>
      </div>
    );
  }
}
