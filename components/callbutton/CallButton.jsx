"use client";
import classes from "./button.module.css";
import { useState } from "react";

import React from "react";

const CallButton = ({ state, setState }) => {
  return (
    <div className="flex  bg-gray-800">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-100 p-4">
        <div className="mb-4 text-center text-3xl text-blue-400 font-bold ">Type</div>
        <ul>
          <li className="mb-2">
            <button
              className={classes.sidebar_button}
              onClick={() => setState("pending")}
            >
              Pending
            </button>
          </li>
          <li className="mb-2">
            <button
              className={classes.sidebar_button}
              onClick={() => setState("rejected")}
            >
              Rejected
            </button>
          </li>
          <li>
            <button
              className={classes.sidebar_button}
              onClick={() => setState("approved")}
            >
              Approved
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CallButton;
