"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Time from "components/date/Time";
import Carousel from "@/components/HomeComponents/Carousel/page";
import Card from "@/components/HomeComponents/Card/page";

export default function Problem({ params: { id } }) {
  const [problem, setProblem] = useState(null);
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("id of particular problem= ", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch problem data
        const problemRes = await fetch(`/api/problem/${id}`, {
          cache: "no-cache",
        });

        if (!problemRes.ok) {
          throw new Error("Problem not found");
        }

        const problemData = await problemRes.json();
        setProblem(problemData);

        // Fetch user data
        const userRes = await fetch(
          `http://localhost:3000/api/user/${problemData.problem.userId}`,
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
        <div className="flex justify-around items-center h-screen ">
          <div className="w-300 ">
            <Card
              title={title}
              content={content}
              problemId={id}
              buildingnumber={buildingNumber}
              floornumber={floorNumber}
              roomnumber={roomNumber}
              createdAt={createdAt}
              image={image}
            />
          </div>
        </div>

        <div className="text-xl">User</div>
        <div>User Name = {name}</div>
        <div>User Email = {email}</div>
      </>
    );
  } else {
    router.push("/signin");
  }
}
