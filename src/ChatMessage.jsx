import React from "react";
import detailsForChatMessage from "./SideBar";
import SideBar from "./SideBar";

function ChatMessage(props) {
  const { selectedRoom, setSelectedRoom } = props;

  return (
    <div className="chatroom-body-message">
      <div className="chatroom-body-message-user">
        {!selectedRoom ? <p>User name</p> : <p>{selectedRoom.roomName}</p>}
      </div>
      {!selectedRoom ? (
        <div className="chatroom-body-message-new-message">
          <p>User Message</p>
        </div>
      ) : (
        selectedRoom.message.map((msg, index) => {
          return (
            <div key={index} className="chatroom-body-message-new-message">
              <p>{msg}</p>
              <p className="timestamp">Sun May 05 06:41</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ChatMessage;
