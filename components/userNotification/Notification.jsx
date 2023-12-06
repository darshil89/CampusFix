"use client";
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
        {data.map((item) => {
          return (
            <div
              key={item?.id}
              className="mt-2 mx-2 mb-2  bg-opacity-75 bg-green-500 text-white rounded-md shadow-md p-2"
            >
              <h1 className="text-xl font-bold mb-4">Congratulations!</h1>
              <p className="text-lg mb-2">
                Your request has been accepted, and the workmen{" "}
                <span className="font-bold "> {item?.workerName} </span> will
                bring their expertise to your doorstep on:
              </p>
              <p className="text-lg font-bold mb-4">{item?.date}</p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <h1 className="text-center text-xl font-bold text-slate-500">No Notifications</h1>;
  }
};

export default Notification;
