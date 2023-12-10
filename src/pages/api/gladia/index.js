import axios from "axios";
import FormData from "form-data";

// export default async function handler(req, res) {
//   try {
//     const form = new FormData();
//     console.log(req.body);
//     form.append("fileUrl", req.body.fileUrl);
//     form.append("toggle_diarization", "true");

//     const response = await axios.post(
//       "https://api.gladia.io/audio/text/audio-transcription/",
//       form,
//       {
//         headers: {
//           ...form.getHeaders(),
//           "x-gladia-key": "404b3198-852b-45fa-bd27-cd06c29be377",
//         },
//       }
//     );
//     console.log("nicnince");
//     console.log(response.data);
//     return res.status(200).json({ bruh: response.data });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI,
});

const ResponseGenerate = async (audio_url) => {
  // const audio_url =
  //   "http://files.gladia.io/example/audio-transcription/split_infinity.wav";
  const form = new FormData();
  form.append("audio_url", audio_url);
  form.append("toggle_diarization", "true");

  const response = await axios.post(
    "https://api.gladia.io/audio/text/audio-transcription/",
    form,
    {
      headers: {
        ...form.getHeaders(),
        "x-gladia-key": "a2bddb5f-7f88-4965-8f93-3a4ec7cbd493",
      },
    }
  );
  // console.log(JSON.stringify(response.data.prediction));

  const extractTranscription = (response) => {
    return {
      transcription: response.transcription,
      speaker: response.speaker,
      time_begin: response.time_begin,
      time_end: response.time_end,
    };
  };
  const inputs = response.data.prediction.map(extractTranscription);
  console.log(JSON.stringify(inputs));
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a formal evaluator of a meeting . With the bewlow data create a formal report on the meeting and a personalizd report ,do include their name and their performance . Response in json mode with no of keys as no of distinct speakers and each person as key and their report as value and general key with general report",
      },
      { role: "user", content: JSON.stringify(inputs) },
    ],

    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });
  console.log(JSON.stringify(completion));
  return completion;
};

export default async function handler(req, res) {
  try {
    const { fileUrl } = req.body;
    console.log(fileUrl);
    const response = await ResponseGenerate(fileUrl);
    const nres = JSON.stringify(response);
    console.log("\n\n\n " + nres + "\n\n\n ");
    return res.status(200).json({ nres });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// const generateAnalysis = async (purpose, messages, input) => {
//   if (messages.length == 0) {
//     messages = [
//       {
//         role: "system",
//         content: You are helpng an interviewer to evaluate the conversation history and suggest next question for the topic of ${purpose},
//       },
//     ];
//     const completion = await openai.chat.completions.create({
//       messages: messages,
//       max_tokens: 150,
//       temperature: 0.9,
//       model: "gpt-3.5-turbo",
//     });
//   }
// };
