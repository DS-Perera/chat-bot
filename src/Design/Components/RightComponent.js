import React from "react";
import icon from "./icn.png";

export default function RightComponent(prop) {
  return (
    <div style={{ display: "flex",justifyContent:"right" }}>
      <div className="right-single-message-box">
        <p className="right-single-message">{prop.txt}</p>
        
      </div>
      <img src={icon} alt="sender icon" height="30px" className="sender-icon" />
    </div>
  );
}
