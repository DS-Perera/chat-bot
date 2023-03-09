import React from "react";
import icon from "./icn.png";

export default function SelectLanguage(prop) {
  return (
    <div style={{ display: "flex", justifyContent: "left" }}>
      <img src={icon} alt="sender icon" height="30px" className="sender-icon" />

      <div className="left-single-message-box">
        <p className="left-single-message">
          Hi <br /> Welcome to hSenid Smart Chatbot
        </p>
        <p className="left-single-message">Select the Language you prefered</p>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <button
            className="option-button"
            onClick={() => {
              prop.language("english");
            }}
          >
            English
          </button>
          <button
            className="option-button"
            onClick={() => {
              prop.language("singlish");
            }}
          >
            Sinhala
          </button>
        </div>
      </div>
    </div>
  );
}
