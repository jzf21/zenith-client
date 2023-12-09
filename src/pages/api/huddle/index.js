import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export default function handler(req, res) {
    const accessToken = new AccessToken({
  apiKey:process.env.API_KEY,
  roomId: res.data.roomId,
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
      walletAddress: "axit.eth",
    },
  },
});
    res.status(200).json({ name: 'John Doe' })
    }