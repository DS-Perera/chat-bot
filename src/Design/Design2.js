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

export default function Design2() {
  const [chat, setChat] = useState([]);
  const [language, setLanguage] = useState("notSelected");
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setbotTyping] = useState(false);
  const [isGreeting, setIsGreeting] = React.useState(false);

  useEffect(() => {
    console.log("called");
    const objDiv = document.getElementById("messageArea");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat]);
  useEffect(() => {
    const userId = Math.round(Math.random() * 10000);
    console.log("user id is" + userId);
  }, []);

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
          setbotTyping(false);
          // console.log(temp)

          setChat((chat) => [...chat, response_temp]);
          // scrollBottom();
        }
      });
  };

  //coment in here
  //   useEffect(async () => {
  //     rasaAPIInitioalMsg("Subhash", "intialmsg");
  //   }, []);

  const handleSubmit = (evt) => {
    // evt.preventDefault();
    const name = "shreyas";
    const request_temp = {
      sender: "user",
      sender_id: name,
      msg: inputMessage,
      language: "english",
    };

    if (inputMessage !== "") {
      setChat((chat) => [...chat, request_temp]);
      setbotTyping(true);
      setInputMessage("");
      rasaAPI(name, inputMessage);
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
      body: JSON.stringify({ sender: name, message: msg, language: language }),
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
          setbotTyping(false);
          console.log(language);
          // console.log(temp)

          setChat((chat) => [...chat, response_temp]);
          // scrollBottom();
        }
      });
  };
  function SetEnglishLanguage(english) {
    setLanguage("english");
  }

  function SetSinglishLanguage(singlish) {
    setLanguage("singlish");
  }

  function selectedlanguageMsg() {
    var msg = "";
    if (language === "singlish") {
      msg = "Singlish is selected";
    }
    if (language === "english") {
      msg = "English is selected";
    }
  }

  return (
    <div>
      <div className="chat-background">
        <div className="heading">
          <img alt="hSendi logo" src={logo} className="hsenid-logo" />
          <div>
            <p className="main-title">Smart Chatbot</p>
            {botTyping ? (
              <p className="typing-text">Chatbot is typing ...</p>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="cardBody" id="messageArea">
          <div className="chat-area">
            {chat.map((user, key) => (
              <div key={key}>
                {user.sender === "user" ? (
                  <div>
                    {user.msg === "hi" ? (
                      <div>
                        <RightComponent txt={user.msg} />
                        <SelectLanguage language={setLanguage} />
                      </div>
                    ) : (
                      <RightComponent txt={user.msg} />
                    )}
                  </div>
                ) : (
                  <div>
                    <LeftComponent txt={user.msg} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="type-area">
          <div className="message-box">
            <input
              type="text"
              value={inputMessage}
              placeholder="Type message here"
              className="message-type-area"
              onChange={(e) => {
                setInputMessage(e.target.value);
                console.log(inputMessage);
              }}
            />
          </div>
          {console.log(language)}
          {language === "english" ? (
            <button className="mic-btn" onClick={() => {}}>
              <img src={mic} alt="mic icon" height="18px" />
            </button>
          ) : (
            <div></div>
          )}
          <button
            className="send-btn"
            onClick={() => {
              if (inputMessage !== "") {
                handleSubmit();
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
