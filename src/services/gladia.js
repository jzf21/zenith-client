import axios from "axios";

import FormData from "form-data";

export const getGladiaTranscription = async (audioUrl) => {
  const form = new FormData();

  form.append("audio_url", audioUrl);
  form.append("toggle_diarization", "true");

  console.log(form);
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
