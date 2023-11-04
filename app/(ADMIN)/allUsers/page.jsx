"use client";
import { useSession } from "next-auth/react";
import Users from "@/components/Users/Users";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";

import { AiTwotoneDelete } from "react-icons/ai";
const AllUsers = () => {
  const { data: session, status } = useSession();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [conform, setConform] = useState(false);

  const handleDeleteUser = async (email) => {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    if (res.ok) {
      const data = await res.json();
      toast.success(data.message);
    } else {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    try {
      fetch("/api/users", {
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
  }, [data]);

  if (session) {
    if (loading) {
      return <SyncLoader className="text-center mt-10" color="#2e3634" />;
    }
    if (!data) {
      return <h1>No data</h1>;
    }

    // console.log("data = ", data);
    return (
      <>
        <h1 className="text-center">All Users</h1>
        <br />
        {data.users?.map((user) => {
          return (
            <div className="flex" key={user.email}>
              <Users key={user.email} name={user.name} email={user.email} />
              <AiTwotoneDelete onClick={() => handleDeleteUser(user.email)} />
            </div>
          );
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

export default AllUsers;
