import AWS from "aws-sdk";
import axios from "axios";
import AxiosInstance from "./AxiosRequest";
import { v4 as uuidv4 } from "uuid"

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_ACCESS_SECRET_KEY,
  region: "us-east-1",
  signatureVersion: "v4",
});

const s3 = new AWS.S3();

const uploadToS3 = async (file, dir) => {
  if (!file) {
    return;
  }
  const params = {
    Bucket: "ai-avengers-content",
    Key: dir,
    Body: file,
  };
  const { Location } = await s3.upload(params).promise();
  return Location
};

export const uploadFile = async (file, onUpload) => {
  if (file.type === 'application/pdf') {
    // eslint-disable-next-line no-unused-expressions
    file.name === `${uuidv4()}.pdf`;
  }
  const { data: signedResponse } = await AxiosInstance.get(`/content/getSignedUrl?file=${file.name}`);
  if(signedResponse) {
    try {
      await axios.put(signedResponse.data.signedUrl, file, {
        headers: {
          'Content-Type': file.type,
         },
      });
    } catch (err) {
      console.log(err)
    }
  }
  return signedResponse.url;
};

export { uploadToS3 };
