import { useState, useRef, useEffect } from "react";
import axios from "axios";
import lighthouse from "@lighthouse-web3/sdk";

import { FaStop, FaPlay, FaPause } from "react-icons/fa";

const mimeType = "audio/webm";

export default function Recorder() {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  const saveAudio = async () => {
    console.log(audio);

    var formData = new FormData();
    formData.append("audio", audio);

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    //const response = await axios.post("/api/lighthouse", formData, config);
    const response = await axios.post(
      "/api/lighthouse",
      {
        fileUrl: audio,
      },
      config
    );

    console.log(response);
  };

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };
const uploadFile = async(file) =>{
  console.log(file)
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    const output = await lighthouse.upload(
      file,
      "fcacc1e4.664b3e079f5445a991389485b98459de",
      false,
      null,
      progressCallback
    );
    console.log('File Status:', output)
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

      console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)
  }
 
  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };
  const stopRecording = async () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
      window.localStorage.setItem("audio", audioBlob);
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      console.log(audioUrl);
      setAudioChunks([]);
    };
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 rounded-t-md bg-gray-700 text-white">
      <p className="text-2xl">Recording Details</p>
      <div className="flex flex-row gap-4 text-2xl">
        <button>
          <FaPlay />
        </button>
        <button>
          <FaPause />
        </button>
        <button>
          <FaStop />
        </button>
      </div>
      <div className="audio-controls">
        {!permission ? (
          <button onClick={getMicrophonePermission} type="button">
            Get Microphone
          </button>
        ) : null}
        {permission && recordingStatus === "inactive" ? (
          <button onClick={startRecording} type="button">
            Start Recording
          </button>
        ) : null}
        {recordingStatus === "recording" ? (
          <button onClick={stopRecording} type="button">
            Stop Recording
          </button>
        ) : null}
        {audio ? (
          <div className="audio-container">
            <audio src={audio} controls></audio>
            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null}
      </div>
      <button
        onClick={() => {
          saveAudio();
        }}
      >
        Save Audio to Lighthouse
      </button>
      <div className="App">
        <input onChange={(e) => uploadFile(e.target.files)} type="file" />
      </div>
    </div>
  );
}
