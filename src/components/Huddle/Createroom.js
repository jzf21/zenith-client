import React, { useEffect } from "react";
import axios from "axios";
//import MeetRoom from "@/pages/_meetroom";
import  {useRouter} from "next/router";

const Createroom = () => {
    const router = useRouter();
  const createRoom = async () => {
    try {
      const response = await axios.post(
        "https://api.huddle01.com/api/v1/create-iframe-room",
        {
          title: "Huddle01-Test",
          hostWallets: [process.env.NEXT_PUBLIC_HOST],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );
      console.log(response.data); 
    //   router.push("/_meetroom")
      // Log the response data if needed
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div>
        <button onClick={createRoom} >Create Room</button>
    </div>
  );
};

export default Createroom;
