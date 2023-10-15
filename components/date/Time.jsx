import React from "react";

const Time = (props) => {
  const { createdAt } = props;
  const timestamp = createdAt; // Assuming it's a string

  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <>
      <p>{formattedDate}</p>
    </>
  );
};

export default Time;
