"use client"

const Notification = ({ userId }) => {

  console.log("userId = ", userId);
  return (
    <div className="mt-2 mx-2 bg-green-500 text-white rounded-md overflow-hidden shadow-md p-2">
      <h1 className="text-xl font-bold mb-4">Congratulations!</h1>
      <p className="text-lg mb-2">
        Your request has been accepted, and the workmen will bring their
        expertise to your doorstep on:
        <p className="text-lg font-bold mb-4">27/07/2023</p>
      </p>
    </div>
  );
};

export default Notification;
