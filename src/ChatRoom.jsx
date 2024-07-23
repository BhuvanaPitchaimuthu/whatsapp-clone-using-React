import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./ChatRoom.css";
import ChatMessage from "./ChatMessage";

function ChatRoom(props) {
  const [userEnteredMessage, setUserEnteredMessage] = useState("");

  function handleInputChange(event) {
    let { type, value } = event.target;
    if (value.length > 40) {
      value = value.slice(0, 40);
      setUserEnteredMessage(value);
    } else {
      setUserEnteredMessage(value);
    }
  }

  function handleInputSubmit(event) {
    // add the new message into the that particular rooms message field
    // render the message using chatmessage componunt
    if (props.selectedRoom) {
      props.selectedRoom.message.push(userEnteredMessage);
      setUserEnteredMessage("");

      // props.setSelectedRoom(props.selectedRoom.message.push(userEnteredMessage));
      event.preventDefault();
    } else {
      setUserEnteredMessage("Select any of the chat room to start to start");
      event.preventDefault();
    }
  }

  return (
    <div className="chatroom">
      <div className="chatroom-header">
        <div className="chatroom-header-left">
          <Avatar
            fontSize="large"
            src="https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg"
          />
          {props.selectedRoom ? (
            <div className="chatroom-name">
              <h2>{props.selectedRoom.roomName}</h2>
              <p>
                Last seen {new Date().toDateString()}{" "}
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          ) : (
            <div className="chatroom-name">
              <h2>new room</h2>
              <p>Last seen today at 7:25 PM</p>
            </div>
          )}
        </div>
        <div className="chatroom-header-right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chatroom-body">
        <ChatMessage
          selectedRoom={props.selectedRoom}
          setSelectedRoom={props.setSelectedRoom}
        />
      </div>
      <div className="chatroom-footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form action="submit" onSubmit={handleInputSubmit}>
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Type a message"
            value={userEnteredMessage}
          />
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatRoom;
