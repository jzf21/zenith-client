import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export default async function handler(req, res) {
  const roomId = req.query.roomId;
  console.log({ roomId });

  try {
    const accessToken = new AccessToken({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
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
          walletAddress: "axit.eth",
        },
      },
    });

    return res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err);
  }
}
