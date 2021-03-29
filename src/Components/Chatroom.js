import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const Chatroom = ({ username }) => {
  // REDIRECT TO LOGIN IF USERNAME IS NULL

  // chatState =  [{}{}{}]
  const [chat, setChat] = useState([]);

  const isTypingRef = useRef();
  const [typingUser, setTypingUser] = useState("");

  const chatWrapperRef = useRef();
  const scrollMessages = () => {
    chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
  };

  const socketRef = useRef();

  // useEffect get io
  useEffect(() => {
    // socketRef.current = io.connect("http://localhost:4040");
    socketRef.current = io.connect("https://messaging-nodejs-app.herokuapp.com");
    socketRef.current.emit("user connection", username);

    // on chat message
    socketRef.current.on("chat message", ({ type, name, message }) => {
      setChat((chat) => [...chat, { type, name, message }]);
      // scroll bottom of list
      scrollMessages();
    });

    // on user log
    socketRef.current.on("user log", ({ type, name, message }) => {
      setChat((chat) => [...chat, { type, name, message }]);
      // scroll bottom of list
    });

    // on user isTyping
    socketRef.current.on("user isTyping", (name) => {
      if (name !== username) {
        // set who is typing
        setTypingUser(`${name} is typing...`);
        // animate opacity
        isTypingRef.current.className = "typing-user typingOn";
        setTimeout(() => {
          console.log(typingUser);
          isTypingRef.current.className = "typing-user typingOff";
        }, 2000);
      }
    });

    return () => {
      // socketRef.current.emit("user disconnect", username);
      socketRef.current.disconnect();
    };
  }, [setChat, username]);

  // sroll to chat bottom function ?

  // handleSubmit function : POST {userMessage}
  const handleSubmit = (e) => {
    e.preventDefault();
    const msgData = {
      type: "message",
      name: username,
      message: e.target[0].value,
    };
    socketRef.current.emit("chat message", msgData);
    e.target[0].value = "";
    scrollMessages();
  };

  // handle Input OnChange
  const handleIsTyping = () => {
    // >> broadcast user is typing
    socketRef.current.emit("isTyping", username);
  };

  // return chat bubble
  const chatMessage = ({ type, name, message }, index) => {
    const myMessage = name === username;
    const messageClass = myMessage ? `${type} mymessage` : type;
    return (
      <li className={myMessage ? "mymessage-li" : "message-li"} key={index}>
        <div className="username-display">{name}</div>
        <div className={messageClass}>{message}</div>
      </li>
    );
  };

  // return log info
  const logMessage = ({ type, name, message }, index) => {
    return (
      <li className="login-alert" key={index}>
        {message}
      </li>
    );
  };

  // render chat
  const renderChat = (chat) => {
    return chat.map((msgData, index) => {
      if (msgData.type === "message") {
        return chatMessage(msgData, index);
      } else {
        return logMessage(msgData, index);
      }
    });
  };

  return (
    <div className="chatroom-page">
      <div id="chat-header">
        <h2> {`logged as ${username}`}</h2>
      </div>
      <ul className="chat-wrapper" id="messages" ref={chatWrapperRef}>
        {/* MAP TROUGH CHAT ARRAY */}
        {renderChat(chat)}
      </ul>
      <div ref={isTypingRef}>{typingUser}</div>

      {/* FORM WRAPPER */}
      <form onSubmit={handleSubmit} id="chat-form">
        <div id="input-form-wrapper">
          <input
            type="text"
            onChange={handleIsTyping}
            placeholder="... drop your most unpopular opinion !"
          ></input>
        </div>
        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

export default Chatroom;
