"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Time from "components/date/Time";
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
    } = problem.problem;

    const { name, email } = user.user;

    return (
      <>
        <div className="text-xl">Problem</div>
        <div>My Problem id is = {id}</div>
        <div className="flex">
          <div>Time : </div>
          <Time createdAt={createdAt} />
        </div>

        <div>My Problem title is = {title}</div>
        <div>My Problem content is = {content}</div>
        <div>My Problem floorNumber is = {floorNumber}</div>
        <div>My Problem roomNumber is = {roomNumber}</div>
        <div>My Problem buildingNumber is = {buildingNumber}</div>
        <div className="text-xl">User</div>
        <div>User Name = {name}</div>
        <div>User Email = {email}</div>
      </>
    );
  } else {
    router.push("/signin");
  }
}
