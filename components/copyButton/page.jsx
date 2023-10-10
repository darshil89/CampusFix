"use client";
import { useState } from "react";
import Image from "next/image";

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
        <img src="/images/copy(1).png" alt="copy" width={10} height={10} />
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CopyButton;
