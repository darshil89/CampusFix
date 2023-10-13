"use client";
import { useState } from "react";
import { RxCopy } from "react-icons/rx";
const CopyButton = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    // Create a temporary text area element
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    // Append the text area to the document
    document.body.appendChild(textArea);

    // Select and copy the text
    textArea.select();
    document.execCommand("copy");

    // Remove the temporary text area
    document.body.removeChild(textArea);

    // Set a flag to indicate that the text has been copied
    setIsCopied(true);

    // Reset the flag after a brief delay
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div>
      <button className="ml-3" onClick={handleCopyClick}>
        {/* <TbCopy /> */}

        {isCopied ? (
          <span className="inline-flex text-l leading-5 font-semibold rounded-full  text-green-600">
            copied!
          </span>
        ) : (
          <RxCopy />
        )}
      </button>
    </div>
  );
};

export default CopyButton;
