"use client"
import React, { useState } from "react";

const AdminReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can use the startDate and endDate values as needed, for example, perform some action or validation.
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Date Range Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="endDate"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminReport;
