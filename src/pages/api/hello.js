// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createHuddleRecorder } from '@/services/huddle'
import { startHuddleRecording } from "@/services/huddle";
import { Recorder } from "@huddle01/server-sdk/recorder";

export default async function handler(req, res) {
  try {
    const huddleRecorder= await createHuddleRecorder();
    const roomId = "wzw-gptk-zuy";
    const smthng = await startHuddleRecording(huddleRecorder, roomId);
    console.log(JSON.stringify(smthng));
  } catch (error) {
    
  }
}
