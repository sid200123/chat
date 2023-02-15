import React, { useContext } from "react";
import Chat from "../../components/Chat";
import DefaultChat from "../../components/DefaultChat";
import Sidebar from "../../components/Sidebar";
import { ChatContext } from "../../context/ChatContext";
import "./Home.scss";

const Home = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="home">
      <div className="homeContainer">
        <Sidebar />
        {data.chatId !== "null" ? <Chat /> : <DefaultChat />}
      </div>
    </div>
  );
};

export default Home;
