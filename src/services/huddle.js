import axios from "axios";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { Recorder } from "@huddle01/server-sdk/recorder";

const apiKey = "kF8SQwnQLwinWuyrbUWDCKyGMNXo6Bu3";

export const createNewHuddleRoom = async () => {
  try {
    const response = await axios.post(
      "https://api.huddle01.com/api/v1/create-iframe-room",
      {
        title: "Huddle01-Test",
        hostWallets: ["0x29f54719E88332e70550cf8737293436E9d7b10b"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );
    return response.data.data.roomId;
  } catch (err) {
    console.log(err);
  }
};

export const createHuddleAccessToken = (roomId) => {
  try {
    const accessToken = new AccessToken({
      apiKey: apiKey,
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
          
        },
      },
    });
    return accessToken;
  } catch (err) {
    console.log(err);
  }
};

export const createHuddleRecorder = () => {
  try {
    const recorder = new Recorder(process.env.NEXT_PUBLIC_PROJECT_ID, apiKey);
    console.log({ recorder });
    return recorder;
  } catch (err) {
    console.log(err);
  }
};

export const startHuddleRecording = (recorder, roomId) => {
  try {
    const newHuddleAccessToken = createHuddleAccessToken(roomId);
    recorder
      .startRecording({
        roomId: roomId,
        token: newHuddleAccessToken,
      })
      .then((r) => {
        console.log(r);
      });
  } catch (err) {
    console.log(err);
  }
};

export const stopHuddleRecording = (recorder, roomId) => {
  try {
    recorder.stop({
      roomId: roomId,
    });
  } catch (err) {
    console.log(err);
  }
};

export const startHuddleLivestream = (recorder, roomId) => {
  try {
    const newHuddleAccessToken = createHuddleAccessToken(roomId);

    recorder.startLivestream({
      roomId: roomId,
      token: newHuddleAccessToken,
      rtmpUrls: [],
    });
  } catch (err) {
    console.log(err);
  }
};
