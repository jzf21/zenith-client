import { useRoom } from "@huddle01/react/hooks";

const Page = () => {
  const { joinRoom, leaveRoom } = useRoom({
    onJoin: () => {
      console.log("Joined the room");
    },
    onLeave: () => {
      console.log("Left the room");
    },
  });

  return (
    <div>
      <button onClick={() => joinRoom("YOUR_ROOM_ID")}>Join Room</button>
      <button onClick={() => leaveRoom("YOUR_ROOM_ID")}>Leave Room</button>
    </div>
  );
};
