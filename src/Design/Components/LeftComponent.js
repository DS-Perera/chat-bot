import React from "react";
import icon from "./icn.png";

export default function LeftComponent(prop) {
  return (
    <div style={{ display: "flex", justifyContent: "left" }}>
      <img src={icon} alt="sender icon" height="30px" className="sender-icon" />
      <div className="left-single-message-box">
        <p className="left-single-message">{prop.txt}</p>
      </div>
    </div>
  );
}
