import axios from "axios";
import FormData from "form-data";

import { uploadFile } from "@/services/lighthouse";

export default async function handler(req, res) {
  const fileUrl = req.body;
  try {
    // let uploadedLink = await uploadFile(fileUrl);

    // uploadedLink = "https://gateway.lighthouse.storage/ipfs/" + uploadedLink;

    // console.log(uploadedLink);

    console.log(req.body);
    return res.status(200).json({ link: fileUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
