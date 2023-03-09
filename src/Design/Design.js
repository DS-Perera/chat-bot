import React from "react";
import react, { useEffect, useState } from "react";
import mic from "./mic.png";
import send from "./send.png";
import logo from "./hSenid_logo.jpg";
import LeftComponent from "./Components/LeftComponent";
import RightComponent from "./Components/RightComponent";
import SelectLanguage from "./Components/SelectLanguage";
import AudioRecord from "./Components/AudioRecord";

export function apiServerUrl() {
  let localUrl = window.location.origin;
  if (localUrl.includes("localhost") || localUrl.includes("172.17.0.1")) {
    console.log("In DEV Mode");
    return "http://172.17.0.1:5000/chat";
  } else {
    console.log("In PRODUCTION Mode");
    return window.location.origin + "/chat";
  }
}

export default function Design() {
  const [typing, setTyping] = React.useState(false);
  const [isEnglish, setIsEnglish] = React.useState("notSelected");
  const [isGreeting, setIsGreeting] = React.useState(false);
  const [text, setText] = React.useState("");
  const [chat, setChat] = React.useState([]);

  useEffect(() => {
    console.log("called");
    const objDiv = document.getElementById("messageArea");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat]);

  const rasaAPIInitioalMsg = async function handleClick(name, msg) {
    //chatData.push({sender : "user", sender_id : name, msg : msg});

    //await fetch('http://localhost:5005/webhooks/rest/webhook', {
    await fetch(apiServerUrl(), {
      method: "POST",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
        charset: "UTF-8",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        sender: name,
        message: msg,
        language: "notSelected",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          const temp = response[0];
          const recipient_id = temp["recipient_id"];
          const recipient_msg = temp["text"];
          const buttons = temp["buttons"];

          const response_temp = {
            sender: "bot",
            recipient_id: recipient_id,
            msg: recipient_msg,
            buttons: buttons,
          };
          setTyping(false);
          // console.log(temp)

          setChat((chat) => [...chat, response_temp]);
          // scrollBottom();
        }
      });
  };

  useEffect(async () => {
    rasaAPIInitioalMsg("Subhash", "intialmsg");
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const name = "shreyas";
    const request_temp = {
      sender: "user",
      sender_id: name,
      msg: text,
      language: "english",
    };

    if (text !== "") {
      setChat((chat) => [...chat, request_temp]);
      setTyping(true);
      // settext("");
      rasaAPI(name, text);
    } else {
      window.alert("Please enter valid message");
    }
  };

  const rasaAPI = async function handleClick(name, msg) {
    //chatData.push({sender : "user", sender_id : name, msg : msg});

    //await fetch('http://'+process.env.REACT_APP_RASA_HOST+':5005/webhooks/rest/webhook', {
    //await fetch('http://localhost:5005/webhooks/rest/webhook', {
    await fetch(apiServerUrl(), {
      method: "POST",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
        charset: "UTF-8",
      },
      credentials: "same-origin",
      // body: JSON.stringify({ sender: name, message: msg, language: language }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          const temp = response[0];
          const recipient_id = temp["recipient_id"];
          const recipient_msg = temp["text"];
          const buttons = temp["buttons"];

          const response_temp = {
            sender: "bot",
            recipient_id: recipient_id,
            msg: recipient_msg,
            buttons: buttons,
          };
          setTyping(false);
          // console.log(language);
          // console.log(temp)

          setChat((chat) => [...chat, response_temp]);
          // scrollBottom();
        }
      });
  };

  return (
    <div>
      <div className="chat-background">
        <div className="heading">
          <img alt="hSendi logo" src={logo} className="hsenid-logo" />
          <div>
            <p className="main-title">Smart Chatbot</p>
            {typing ? (
              <p className="typing-text">Chatbot is typing ...</p>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="chat-area" id="messageArea">
          {isGreeting && <RightComponent txt="hi" />}
          {isGreeting && <SelectLanguage language={setIsEnglish} />}
          {console.log(chat)}
          {chat.map((val, key) => {
            return (
              <div key={key}>
                {val.from === "user" ? (
                  <RightComponent txt={val.msj} />
                ) : (
                  <div></div>
                )}
                {val.from === "bot" ? (
                  <LeftComponent txt={val.msj} />
                ) : (
                  <div></div>
                )}
                {val.from === "record" ? <AudioRecord /> : <div></div>}
              </div>
            );
          })}

          {/* <LeftComponent />
          <LeftComponent />
          <RightComponent /> */}
        </div>
        <div className="type-area">
          <div className="message-box">
            <input
              type="text"
              value={text}
              placeholder="Type message here"
              className="message-type-area"
              onChange={(e) => {
                setText(e.target.value);
                console.log(text);
              }}
            />
            {isEnglish ? (
              <button
                className="mic-btn"
                onClick={() => {
                  setTimeout(() => {
                    setChat([
                      ...chat,
                      {
                        from: "record",
                        msj: text,
                      },
                      {
                        from: "bot",
                        msj: "Chatbot is supporting for voice records",
                      },
                    ]);
                  }, 1000);
                }}
              >
                <img src={mic} alt="mic icon" height="18px" />
              </button>
            ) : (
              <div></div>
            )}
          </div>
          <button
            className="send-btn"
            onClick={() => {
              if (text !== "") {
                if (text === "hi" || text === "Hi") {
                  setIsGreeting(true);
                  setText("");
                } else {
                  const chat2 = chat;
                  const newChat = {
                    from: "user",
                    msj: text,
                  };
                  setText("");
                  const chat3 = [...chat2, newChat];
                  setChat(chat3);
                  setTyping(true);
                  setTimeout(() => {
                    const newCht = {
                      from: "bot",
                      msj: "chatbot is under construction",
                    };
                    const cht3 = [...chat3, newCht];
                    setChat(cht3);
                    setTyping(false);
                  }, 1000);
                }
              }
            }}
          >
            <img src={send} alt="send message icon" height="18px" />
          </button>
        </div>
      </div>
    </div>
  );
}
