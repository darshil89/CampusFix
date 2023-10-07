"use client";
import { useState } from "react";
import classes from "./feedback.module.css";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
export default function Feedback(props) {
  const id = props.id;
  const name = props.name;
  const [data, setData] = useState({
    title: "",
    description: "",
    check: "",
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();

    toast.info("on going", { autoClose: 5000 });

    const res = await fetch("/api/problems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, id, name }),
    });

    const result = await res.json();
    console.log("result  =  ", result);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Problem Added", { autoClose: 4000 });
    console.log("result  =  ", result);
    setData({
      title: "",
      content: "",
      buildingNumber: "",
      floorNumber: "",
      roomNumber: "",
    });
  };
  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.box1}>
        <label className={classes.label}> Select Problem</label>
        <select
          id="title"
          name="title"
          className={classes.select}
          placeholder="Problem name"
          value={data.title}
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
        >
          <option className={classes.option} value="null">
            Problem Name{" "}
          </option>
          <option className={classes.option} value="Electrical">
            Electrical
          </option>
          <option className={classes.option} value="Carpentary">
            Carpentary
          </option>
          <option className={classes.option} value="Plumber">
            Plumber
          </option>
          <option className={classes.option} value="other">
            other
          </option>
        </select>
      </div>
      <div className={classes.box2}>
        {/* <label className={classes.label}>content</label> */}
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

      <div className={classes.box1}>
        {/* <label className={classes.label}>Location</label> */}
        <label className={classes.label}> Status</label>
        <select
          id="title"
          name="title"
          className={classes.select}
          placeholder="Status"
          value={data.check}
          onChange={(e) => {
            setData({ ...data, check: e.target.value });
          }}
        >
          <option className={classes.option} value="null">
            Select{" "}
          </option>
          <option className={classes.option} value="Completed">
            Completed
          </option>
          <option className={classes.option} value="Not Completed">
            Not Completed
          </option>
        </select>
      </div>

      <button className={classes.submit} type="submit">
        Submit
      </button>
    </form>
  );
}
