"use client";
import { useState } from "react";
import classes from "./feedback.module.css";
import { toast } from "react-toastify";
export default function Feedback(props) {
  const id = props.id;
  const name = props.name;
  const [problems, setProblems] = useState([]);
  const [data, setData] = useState({
    problemId: "",
    description: "",
    check: "",
  });

  const getProblem = async () => {
    const res = await fetch(`http://localhost:3000/api/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setProblems(result.user.problems);
    if (result.error) {
      toast.error(result.error);
      return;
    }
  };
  getProblem();

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
          id="problemId"
          name="problemId"
          className={classes.select}
          placeholder="Problem name"
          value={data.problemId}
          onChange={(e) => {
            setData({ ...data, problemId: e.target.value });
          }}
        >
          <option className={classes.option} value="null">
            Problem Name{" "}
          </option>

          {problems.map((problems) => (
            <option
              className={classes.option}
              key={problems.id} // Use a unique identifier as the key
              value={problems.id} // Use a unique identifier as the value
            >
              {problems.content} {/* Display the 'content' property */}
            </option>
          ))}
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
