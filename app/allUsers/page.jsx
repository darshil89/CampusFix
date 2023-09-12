"use client";
import { useSession } from "next-auth/react";
import Users from "@/components/Users/Users";
import { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";
const allUsers = () => {
  const { data: session, status } = useSession();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      fetch("http://localhost:3000/api/users", {
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    } catch (error) {
      console.log("error = ", error.message);
    }
  }, []);

  if (session) {
    if (loading) {
      return <SyncLoader className="text-center mt-10" color="#2e3634" />
    }
    if (!data) {
      return <h1>No data</h1>;
    }

    console.log("data = ", data);
    return (
      <>
        <h1 className="text-center">All Users</h1>
        <br />
        {data.users?.map((user) => {
          return <Users key={user.email} name={user.name} email={user.email} />;
        })}
      </>
    );
  } else {
    return (
      <>
        <h1 className="text-center">You are not authorized</h1>
      </>
    );
  }
};

export default allUsers;
