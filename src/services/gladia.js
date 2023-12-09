import axios from "axios";
import FormData from "form-data";

import fs from "fs";

export const getGladiaTranscription = async () => {
  const form = new FormData();
  const audiofile = fs.createReadStream("./public/speech.mp3");
  form.append("audio_file", audiofile);
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
  console.log(response);
  return response.data;
};
