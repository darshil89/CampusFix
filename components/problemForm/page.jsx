"use client";
import { useState } from "react";
import classes from "./problem.module.css";
export default function Problems() {
  return (
    <form className={classes.form}>
      <div className={classes.box1}>
        <label className={classes.label}> Problem Type</label>
        <select id="title" name="title" className={classes.select} placeholder="Problem Type">
          <option className={classes.option} value="problem1">Electrical</option>
          <option className={classes.option} value="problem2">Carpentary</option>
          <option className={classes.option} value="problem3">Plumber</option>
        </select>
      </div>
      <div className={classes.box2}>
        {/* <label className={classes.label}>Description</label> */}
        <textarea
          className={classes.textarea}
          type="text"
          placeholder="Description"
        />
      </div>

      <div className={classes.box3}>
        {/* <label className={classes.label}>Location</label> */}
        <input
          className={classes.input}
          type="number"
          placeholder="Building Number"
        />
        <input
          className={classes.input}
          type="number"
          placeholder="Floor Number"
        />
        <input
          className={classes.input}
          type="number"
          placeholder="Room Number"
        />
      </div>
      <button className={classes.submit}>Submit</button>
    </form>
  );
}
