"use client";
import { useState } from "react";
import classes from "./feedback.module.css";
import { toast } from "react-toastify";
export default function Feedback(props) {
  const id = props.id;
  const [data, setData] = useState({
    problemId: "",
    description: "",
    check: "",
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();

    toast.info("on going", { autoClose: 5000 });

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, id }),
    });

    const result = await res.json();
    console.log("result  =  ", result);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("feedback Added", { autoClose: 4000 });
    console.log("result  =  ", result);
    setData({
      problemId: "",
      description: "",
      check: "",
    });
  };
  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.box1}>
        <label className={classes.label}> Problem Id</label>
        <input
          id="problemId"
          name="problemId"
          className={classes.select}
          placeholder="Problem Id"
          value={data.problemId}
          onChange={(e) => {
            setData({ ...data, problemId: e.target.value });
          }}
        />
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
          id="problemId"
          name="problemId"
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
