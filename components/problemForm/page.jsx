"use client";
import { useState } from "react";
import classes from "./problem.module.css";
export default function Problems(props) {
  const id = props.id;
  const [data, setData] = useState({
    title: "",
    description: "",
    buildingNumber: "",
    floorNumber: "",
    roomNumber: "",
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    console.log(data);
    // const res = await fetch("/api/problems", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ data, id }),
    // });
  };
  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.box1}>
        <label className={classes.label}> Problem Type</label>
        <select
          id="title"
          name="title"
          className={classes.select}
          placeholder="Problem Type"
          value={data.title}
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
        >
          <option className={classes.option} value="Electrical">
            Electrical
          </option>
          <option className={classes.option} value="Carpentary">
            Carpentary
          </option>
          <option className={classes.option} value="Plumber">
            Plumber
          </option>
        </select>
      </div>
      <div className={classes.box2}>
        {/* <label className={classes.label}>Description</label> */}
        <textarea
          className={classes.textarea}
          type="text"
          placeholder="Description"
          value={data.description}
          onChange={(e) => {
            setData({ ...data, description: e.target.value });
          }}
        />
      </div>

      <div className={classes.box3}>
        {/* <label className={classes.label}>Location</label> */}
        <input
          className={classes.input}
          type="number"
          placeholder="Building Number"
          value={data.buildingNumber}
          onChange={(e) => {
            setData({ ...data, buildingNumber: e.target.value });
          }}
        />
        <input
          className={classes.input}
          type="number"
          placeholder="Floor Number"
          value={data.floorNumber}
          onChange={(e) => {
            setData({ ...data, floorNumber: e.target.value });
          }}
        />
        <input
          className={classes.input}
          type="number"
          placeholder="Room Number"
          value={data.roomNumber}
          onChange={(e) => {
            setData({ ...data, roomNumber: e.target.value });
          }}
        />
      </div>
      <button className={classes.submit} type="submit">
        Submit
      </button>
    </form>
  );
}
