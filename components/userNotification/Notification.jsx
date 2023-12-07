"use client";
import CopyButton from "../copyButton/page";
import { useEffect, useState } from "react";
const Notification = ({ userId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const baseUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://dayanand.vercel.app";
        const res = await fetch(`${baseUrl}/api/notification/${userId}`);
        const data = await res.json();
        setData(data);
      } catch (error) {}
    };
    getNotification();
  }, []);

  console.log("data = ", data);

  console.log("userId = ", userId);

  if (data.length > 0) {
    return (
      <div className="overflow-scroll">
        {[...data].reverse().map((item) => {
          return (
            <div
              key={item?.id}
              className={`mt-2 mx-2 mb-2 bg-opacity-75 ${
                item.status === "approved" ? "bg-green-500" : "bg-red-500"
              } text-white rounded-md shadow-md p-2`}
            >
              <h1 className="text-xl font-bold mb-4">
                {item.status === "approved" ? "Congratulations!" : "Sorry!"}
              </h1>
              <p className="text-lg mb-2">
                {item.status === "approved" ? (
                  <>
                    Your request has been{" "}
                    <span className="font-bold">approved</span>, and the workmen{" "}
                    <span className="font-bold">{item?.workerName}</span> will
                    bring their expertise to your doorstep on:
                  </>
                ) : (
                  <>
                    Your request has been{" "}
                    <span className="font-bold">rejected</span>. Please contact
                    admin for further details.
                  </>
                )}
              </p>
              {item.status === "approved" && (
                <>
                  <p className="text-lg font-bold mb-4">{item?.date}</p>
                  <div className="flex font-bold items-center text-lg">
                    <span>Contact Info: {item?.phone}</span>
                    <CopyButton textToCopy={item?.phone} />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <h1 className="text-center text-xl font-bold text-slate-500">
        No Notifications
      </h1>
    );
  }
};

export default Notification;
