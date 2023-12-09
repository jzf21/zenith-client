import lighthouse from "@lighthouse-web3/sdk";

export const uploadFile = async (url) => {
  const uploadResponse = await lighthouse.upload(
    "url",
    "fcacc1e4.664b3e079f5445a991389485b98459de"
  );

  console.log(uploadResponse);
  return uploadResponse.data.Hash;
};
