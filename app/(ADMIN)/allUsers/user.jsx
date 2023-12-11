"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";

import { AiTwotoneDelete } from "react-icons/ai";

import CopyButton from "@/components/copyButton/page";
import Image from "next/image";
const ClientUserPage = () => {
  const { data: session, status } = useSession();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteUser = async (email) => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://dayanand.vercel.app";
    const res = await fetch(`${baseUrl}/api/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    if (res.ok) {
      const data = await res.json();
      toast.success(data.message);
      setConfirm(!confirm);
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
  }, [confirm]);

  console.log("data = ", data);

  if (session) {
    if (loading) {
      return <SyncLoader className="text-center mt-10" color="#2e3634" />;
    }
    if (data.length === 0) {
      return (
        <Image
          src="/images/no-data.png"
          alt="No data"
          height={600}
          width={600}
        ></Image>
      );
    }
    if (data) {
      return (
        <div>
          <br />
          <table className="min-w-full bg-gray-100 ">
            <thead>
              <tr>
                <th className="py-2 px-4 text-center text-l border-b-2 border-gray-300">
                  Name
                </th>
                <th className="py-2 px-4 text-center text-l border-b-2 border-gray-300">
                  Email
                </th>
                <th className="py-2 px-4 text-center text-l border-b-2 border-gray-300">
                  User-Id
                </th>
                <th className="py-2 px-4 text-center text-l border-b-2 border-gray-300">
                  Action
                </th>
              </tr>
            </thead>

            {data.users?.map((user) => {
              return (
                <tbody key={user.email}>
                  <tr>
                    <td className="py-3 px-4 text-center">{user.name}</td>

                    <td className="py-3   px-4 text-center">{user.email}</td>

                    <td className="py-3 flex justify-center  px-4 text-center">
                      {user.id} &nbsp; <CopyButton textToCopy={user.id} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <AiTwotoneDelete
                        onClick={() => {
                          setUserToDelete(user.email);
                          setShowPopup(true);
                        }}
                      />
                      {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                          <div className="bg-white p-6 rounded shadow-lg w-1/3">
                            <h2 className="text-2xl mb-4">
                              Are you sure you want to delete this user?
                            </h2>
                            <div className="flex justify-end">
                              <button
                                onClick={() => {
                                  handleDeleteUser(userToDelete);
                                  setShowPopup(false);
                                }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowPopup(false)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <hr />
        </div>
      );
    }
  } else {
    return (
      <>
        <h1 className="text-center">You are not authorized</h1>
      </>
    );
  }
};

export default ClientUserPage;
