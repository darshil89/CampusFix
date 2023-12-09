"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";
import { AiOutlineUser } from "react-icons/ai";
import { toast } from "react-toastify";
import PopUp from "../popUp/page";
import Link from "next/link";
import Image from "next/image";
const Problem = () => {
  const { data: session, status } = useSession();

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [showPopUp, setShowPopUp] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async (status) => {
    try {
      fetch("/api/allProblems", {
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
  };

  useEffect(() => {
    getData();
  }, [update]);

  // Define a function to determine the background color class based on the status
  function getStatusColor(status) {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  const closePopUp = () => {
    setShowPopUp(null);
  };

  const openPopUp = (problemId) => {
    setShowPopUp(problemId);
  };

  const handleAddNotification = async (formData, problemId, userId, status) => {
    try {
      if (!formData) {
        formData = {
          workerName: "",
          phoneNumber: "",
          date: "",
        };
      }
      const response = await fetch("/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            workerName: formData.workerName,
            userId: userId,
            problemId: problemId,
            phone: formData.phoneNumber,
            date: formData.date,
            status: status,
          },
        }),
      });
      console.log("response = ", response);
      toast.success("Notification Send");
    } catch (error) {
      console.error(error);
    }
  };

  const handlerApprove = async (problemId, userId, formData) => {
    try {
      await handleAddNotification(formData, problemId, userId, "approved");
      console.log("formData = ", formData);
      const response = await fetch("/api/allProblems", {
        method: "PUT",
        body: JSON.stringify({
          problemId: problemId,
          status: "approved",
        }),
      });
      if (response.ok) {
        const updatedData = data;

        const problemToUpdate = updatedData.find(
          (item) => item.id === problemId
        );
        if (problemToUpdate) {
          problemToUpdate.status = "approved";
        }
        setUpdate(updatedData);
        setData(updatedData);
        toast.success("Problem Approved");
      } else {
        toast.error("Problem not approved");
      }
    } catch (error) {
      console.log("error in updating = ", error);
    }
  };

  const handlerReject = async (problemId, userId) => {
    try {
      await handleAddNotification(null, problemId, userId, "rejeacted");
      const response = await fetch("/api/allProblems", {
        method: "PUT",
        body: JSON.stringify({
          problemId: problemId,
          status: "rejected",
        }),
      });

      if (response.ok) {
        const updatedData = data;

        const problemToUpdate = updatedData.find(
          (item) => item.id === problemId
        );
        if (problemToUpdate) {
          problemToUpdate.status = "rejected";
        }
        setUpdate(updatedData);
        setData(updatedData);
        toast.success("Problem Rejected");
      } else {
        toast.error("Problem not rejected");
      }
    } catch (error) {
      console.log("error in updating = ", error);
    }
  };

  if (session) {
    if (loading) {
      return (
        <SyncLoader
          className="text-center mt-10 lg:ml-96 lg:mr-96"
          color="#2e3634"
        />
      );
    }
    if (data.length === 0) {
      return <Image src="/images/no-data.png" alt="No data" height={600} width={600}></Image>
    }

    return (
      <>
        {data.map((problem) => {
          return (
            <ul role="list" key={problem.id} className=" w-100 ml-10 mr-5">
              <li
                key={problem.id}
                className="flex justify-between gap-x-96 py-5"
              >
                <div className="flex  gap-x-4">
                  <AiOutlineUser className="flex-shrink-0 w-10 h-10 rounded-full" />
                  <div className="">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {problem.title}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {problem.content}
                    </p>
                    <p className=" truncate text-xs leading-5 text-gray-500">
                      by-{problem.name}
                    </p>
                    <p>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          problem.status
                        )}`}
                      >
                        {problem.status}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                    href={`/allProblems/${problem.id}`}
                  >
                    View
                  </Link>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={() => openPopUp(problem.id)}
                  >
                    Approve
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handlerReject(problem.id, problem.userId)}
                  >
                    Reject
                  </button>
                  {showPopUp === problem.id && (
                    <PopUp
                      onClose={closePopUp}
                      onSave={(formData) =>
                        handlerApprove(problem.id, problem.userId, formData)
                      }
                    />
                  )}
                </div>
              </li>
            </ul>
          );
        })}
      </>
    );
  } else {
    return (
      <SyncLoader
        className="text-center mt-10 lg:ml-96 lg:mr-96"
        color="#2e3634"
      />
    );
  }
};

export default Problem;
