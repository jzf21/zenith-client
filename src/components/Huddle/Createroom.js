import React, { useEffect, useState } from "react";
import axios from "axios";
//import MeetRoom from "@/pages/_meetroom";
import { useRouter } from "next/router";
import {
  createNewHuddleRoom,
  createHuddleAccessToken,
} from "../services/huddle";

import { useRoom } from "@huddle01/react/hooks";

const Createroom = () => {
  const router = useRouter();

  const [newRoomId, setNewRoomId] = useState(null);

  const { joinRoom, leaveRoom } = useRoom({
    onJoin: () => {
      console.log("Joined the room");
    },
    onLeave: () => {
      console.log("Left the room");
    },
  });

  const createRoom = async () => {
    try {
      const newRoomId = await createNewHuddleRoom();

      setNewRoomId(newRoomId);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div>
      <button onClick={createRoom}>Create Room</button>
      <p>Room ID: {newRoomId}</p>
      <div>
        <button
          onClick={async () => {
            const newHuddleAccessToken = await createHuddleAccessToken(
              newRoomId
            );
            console.log(newHuddleAccessToken);
            await joinRoom(newRoomId, newHuddleAccessToken);
          }}
        >
          Join Room
        </button>
        <button onClick={() => leaveRoom(newRoomId)}>Leave Room</button>
      </div>
    </div>
  );
};

export default Createroom;
