import axios from "axios";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export const createNewHuddleRoom = async () => {
  try {
    const response = await axios.post(
      "https://api.huddle01.com/api/v1/create-room",
      {
        title: "Huddle01-Test",
        hostWallets: ["0x29f54719E88332e70550cf8737293436E9d7b10b"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "kF8SQwnQLwinWuyrbUWDCKyGMNXo6Bu3",
        },
      }
    );
    console.log(response.data.roomId);
    return response.data.data.roomId;
  } catch (err) {
    console.log(err);
  }
};

export const createHuddleAccessToken = (roomId) => {
  try {
    const accessToken = new AccessToken({
      apiKey,
      roomId: roomId,
      role: Role.HOST,
      permissions: {
        admin: true,
        canConsume: true,
        canProduce: true,
        canProduceSources: {
          cam: true,
          mic: true,
          screen: true,
        },
        canRecvData: true,
        canSendData: true,
        canUpdateMetadata: true,
      },
      options: {
        metadata: {
          // you can add any custom attributes here which you want to associate with the user
          walletAddress: "0x0E797c5FBb02Dd1CdCbd783313Bc9C3a36974da1",
        },
      },
    });
    console.log(accessToken)
    return accessToken;
  } catch (err) {
    console.log(err);
  }
};
