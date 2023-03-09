import React from "react";
import icon from "./icn.png";

export default function AudioRecord() {
  return (
    <div style={{ display: "flex", justifyContent: "right" }}>
      <div className="right-single-message-box" style={{ display: "flex" }}>
        <p className="right-single-message">Recording from User</p>
        <p
          style={{
            cursor: "pointer",
            marginLeft: "10px",
            fontSize: "12px",
            textDecoration: "underline",
            marginTop: "3px",
          }}
          onClick={() => {
            window.alert("Audio record is playing");
          }}
        >
          Listern
        </p>
        <p
          style={{
            cursor: "pointer",
            marginLeft: "10px",
            fontSize: "12px",
            textDecoration: "underline",
            marginTop: "3px",
          }}
          onClick={() => {
            window.alert("Audio message is displaying here");
          }}
        >
          Message
        </p>
      </div>
      <img src={icon} alt="sender icon" height="30px" className="sender-icon" />
    </div>
  );
}
