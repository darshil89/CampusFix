"use client";
import React, { useState } from "react";
export default function PopUp({ onClose, onSave }) {
  const [workerName, setWorkerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = (event) => {
    event.preventDefault();
    // Perform save operation or validation here
    if (!workerName || !phoneNumber || !date) {
      setErrorMessage("All fields are required");
      return;
    }
    const formData = {
      workerName,
      phoneNumber,
      date,
    };
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Input Details</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Worker Name"
            value={workerName}
            onChange={(e) => setWorkerName(e.target.value)}
            className="mt-1 block w-full p-2  mb-2 rounded-md border-gray-300 shadow-sm"
          />
          <input
            type="tel"
            placeholder="Telephone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full p-2 mb-2 rounded-md border-gray-300 shadow-sm"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full p-2 mb-2 rounded-md border-gray-300 shadow-sm"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
