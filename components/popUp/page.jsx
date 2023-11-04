import React from "react";
const popUp = ({ onClose, onSave }) => {
  const handleSave = () => {
    // Perform save operation or validation here
    onSave();
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Popup Box</h2>
        <label>
          Input Details:
          <input type="text" placeholder="Enter details" />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default popUp;
