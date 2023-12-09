import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  createNewHuddleRoom,
  createHuddleAccessToken,
  startHuddleRecording,
  stopHuddleRecording,
  createHuddleRecorder,
} from "../../services/huddle";
import { useRoom } from "@huddle01/react/hooks";
import axios from "axios";

const Createroom = () => {
  const router = useRouter();

  const [roomId, setRoomId] = useState("");
  const [huddleRecorder, setHuddleRecorder] = useState(null);

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
      setRoomId(newRoomId);
      console.log({ roomId });
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="mt-20">
      <button onClick={createRoom}>Create Room</button>
      <p>Room ID: {roomId}</p>
      <div className="flex flex-col gap-4">
        <button
          onClick={async () => {
            const response = await axios.get("/api/huddle/" + roomId);
            console.log(response.data.accessToken );
            await joinRoom(roomId, response.data.accessToken);
          }}
        >
          Join Room
        </button>
        <button onClick={() => leaveRoom(roomId)}>Leave Room</button>
        <button
          onClick={() => {
            const newHuddleRecorder = createHuddleRecorder();
            setHuddleRecorder(newHuddleRecorder);
          }}
        >
          create huddleRecorder
        </button>
        <button
          onClick={() => {
            startHuddleRecording(huddleRecorder, roomId);
          }}
        >
          Start record
        </button>
        <button
          onClick={() => {
            stopHuddleRecording(huddleRecorder, newRoomId);
          }}
        >
          Stop record
        </button>
      </div>
    </div>
  );
};

export default Createroom;
