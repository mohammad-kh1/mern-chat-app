import React from "react";
import useConversation from "../../../store/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { getTime } from "../../utils/getTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser.id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-500";
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user profile" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} `}>
        {message.message}
      </div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>
        {getTime(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
