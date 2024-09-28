import React, { useState } from "react";

const CopyButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("This is the copied text!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="copy-wrapper">
      <input
        className="check"
        type="checkbox"
        id="copy-toggle"
        checked={copied}
        onChange={handleCopy}
      />
      <label className="container" htmlFor="copy-toggle" onClick={handleCopy}>
        <svg
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
          className={`icon ${copied ? "active" : "inactive"}`}
        >
          <path
            d={
              copied
                ? "M384 96V384C384 419.3 356.3 448 320 448H96C60.65 448 32 419.3 32 384H0C0 426.5 37.5 464 80 464H336C378.5 464 416 426.5 416 384V128C416 85.49 378.5 48 336 48H128C85.49 48 48 85.49 48 128V160C48 160 48 128 48 128C48 92.65 75.65 64 112 64H384z"
                : "M224 64H48C21.49 64 0 85.49 0 112V384C0 410.5 21.49 432 48 432H224C250.5 432 272 410.5 272 384V112C272 85.49 250.5 64 224 64zM208 384H64C57.4 384 52 378.6 52 372V124C52 117.4 57.4 112 64 112H208C214.6 112 220 117.4 220 124V372C220 378.6 214.6 384 208 384z"
            }
          ></path>
        </svg>
        <span className="copy-text">{copied ? "Copied!" : "Copy"}</span>
      </label>
    </div>
  );
};

export default CopyButton;
