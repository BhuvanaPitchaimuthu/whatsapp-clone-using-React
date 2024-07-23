import React, { useState } from "react";
import "./App.css";
import SideBar from "./SideBar";
import ChatRoom from "./ChatRoom";

function App() {
  let uniqueRoomId = 0;
  const date = new Date();
  console.log(date.toDateString());
  console.log(date.toLocaleTimeString());

  const [allRooms, setAllRoom] = useState([
    {
      roomId: uniqueRoomId,
      roomName: "Bhuvana",
      message: ["Bhuvana message", "Bhuvi message"],
      isDropDownOpen: false,
      isPinned: false,
    },
    {
      roomId: (uniqueRoomId += 1),
      roomName: "Amuthan",
      message: ["Amuthan message"],
      isDropDownOpen: false,
      isPinned: false,
    },
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="app">
      {/* app body */}
      <div className="app-body">
        {/* sidebar */}
        <SideBar
          allRooms={allRooms}
          setAllRoom={setAllRoom}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          uniqueRoomId={uniqueRoomId}
        />
        {/* chat rooms */}
        <ChatRoom
          allRooms={allRooms}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
      </div>
    </div>
  );
}

export default App;
