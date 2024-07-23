import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import "./Sidebar.css";
import { IconButton, boxClasses } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

// Simply get a random avatar
generator.generateRandomAvatar();

function SideBar(props) {
  let uniqueRoomId = props.uniqueRoomId;

  const [pinComment, setPinComment] = useState("Pin Chat");

  function addNewRoom() {
    var newRoomName = prompt("Enter new room name");
    props.setAllRoom((prevVal) => {
      return [
        ...prevVal,
        {
          roomId: (uniqueRoomId += 1),
          roomName: newRoomName,
          message: ["Bhuvana message"],
          isDropDownOpen: false,
          isPinned: false,
        },
      ];
    });
    console.log(props.allRooms);
  }

  function handleDropDown(index) {
    if (props.allRooms.length > 0) {
      props.setAllRoom((prevVal) => {
        return prevVal.map((room, id) => {
          if (index === id) {
            return { ...room, isDropDownOpen: !room.isDropDownOpen };
          } else {
            return room;
          }
        });
      });
    } else {
      console.log("allRooms array is empty");
    }
  }

  function handlePinChat(index, roomIdenty) {
    const pinnedChat = props.allRooms.splice(index, 1)[0];

    pinnedChat.isPinned = !pinnedChat.isPinned;
    pinnedChat.isDropDownOpen = !pinnedChat.isDropDownOpen;
    if (pinnedChat.isPinned) {
      props.allRooms.unshift(pinnedChat);
    } else {
      props.allRooms.push(pinnedChat);
    }

    const updatedAllRoomsWithDropDownClosed = props.allRooms.map((room, id) => {
      return {
        ...room,
      };
    });

    props.setAllRoom(updatedAllRoomsWithDropDownClosed);
  }

  function handleUserChat(room) {
    console.log("Inside handle user");
    props.setSelectedRoom(room);
    console.log(props.selectedRoom);
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-left">
          <Avatar
            fontSize="large"
            src="https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg"
          />
        </div>
        <div className="sidebar-header-right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-common">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar-chats">
        <div className="sidebar-chats-add-new-chats">
          <h2 onClick={addNewRoom}>Add new chat</h2>
        </div>
        {props.allRooms.map((room, index) => {
          // let newAvatar=generator.generateRandomAvatar();
          return (
            <div
              className="sidebar-chats-old"
              onClick={() => {
                handleUserChat(room);
              }}
            >
              <Avatar
                key={room.roomId}
                id={room.roomId}
                fontSize="large"
                src="https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg"
              />
              {/* <Avatar
                key={room.roomId}
                id={room.roomId}
                fontSize="large"
                src={newAvatar}
              /> */}
              <div className="sidebar-chats-old-message">
                <h2>{room.roomName}</h2>
                <p>{room.message[0]}</p>
              </div>
              <div
                className="dropdown"
                onClick={() => {
                  handleDropDown(index);
                }}
              >
                {room.isPinned && (
                  <div className="pin">
                    <IconButton>
                      <PushPinIcon fontSize="small" />
                    </IconButton>
                  </div>
                )}

                <IconButton>
                  <KeyboardArrowDownIcon />
                </IconButton>
                {room.isDropDownOpen && (
                  <div className="dropdown-box">
                    <p
                      onClick={() => {
                        handlePinChat(index, room.roomId);
                      }}
                    >
                      {room.isPinned ? "Unpin chat" : "Pin Chat"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
