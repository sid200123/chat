import React, { useContext, useState } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);

  const handleDelete = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: [],
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: "",
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: "",
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };
  return (
    <div className="chat">
      {showProfile === false ? (
        <>
          <div className="chatInfo">
            <div>
              <img src={data.user.photoURL} alt="user" />
              <span>{data.user?.displayName}</span>
            </div>
            <div className="chatIcons">
              <Dropdown>
                <Dropdown.Toggle variant="transparent"></Dropdown.Toggle>
                <Dropdown.Menu className="p-0">
                  <Dropdown.Item
                    onClick={() => setShowProfile(true)}
                    className="nav-link bg-transparent border-bottom fw-bold text-secondary p-2"
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={handleDelete}
                    className="nav-link bg-transparent border-bottom fw-bold text-secondary p-2"
                  >
                    Delete Messages
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Messages />
          <Input />
        </>
      ) : (
        <>
          <div className="chatInfo d-flex justify-content-end">
            <button
              className="btn btn-transparent"
              onClick={() => setShowProfile(false)}
            >
              Back
            </button>
          </div>
          <div className="userData w-100 bg-light h-100">
            <div className="user-image p-4 d-flex flex-column align-items-center bg-success">
              <img
                src={data.user.photoURL}
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                alt="user"
              />
            </div>
            <div className="w-100 bg-light p-4">
              <div className="user-id text-start w-100 ms-4 fs-4">
                <span className="fw-bold">User Id</span> : {data.user?.uid}
              </div>
              <div className="user-name text-start w-100 ms-4 fs-4">
                <span className="fw-bold">Name</span> : {data.user?.displayName}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
