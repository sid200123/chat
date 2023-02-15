import { format } from "date-fns";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  console.log("messages", message);

  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo text-center">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span
          style={{ fontSize: "10px" }}
          className="d-flex justify-content-center"
        >
          {format(message.date.toDate(), "dd/MM/yyyy") ===
          format(new Date(), "dd/MM/yyyy")
            ? "Today"
            : format(message.date.toDate(), "dd/MM/yyyy")}
        </span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt="" />}
      </div>
    </div>
  );
};

export default Message;
