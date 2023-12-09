import axios from "axios";
import FormData from "form-data";

import { uploadFile } from "@/services/lighthouse";

export default async function handler(req, res) {
  try {
    let uploadedLink = await uploadFile();

    uploadedLink = "https://gateway.lighthouse.storage/ipfs/" + uploadedLink;

    console.log(uploadedLink);

    const form = new FormData();
    form.append("audio_url", uploadedLink);
    form.append("toggle_diarization", "true");

    const response = await axios.post(
      "https://api.gladia.io/audio/text/audio-transcription/",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "x-gladia-key": "404b3198-852b-45fa-bd27-cd06c29be377",
        },
      }
    );

    console.log(response.data);
    return res.status(200).json({ bruh: response.data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
