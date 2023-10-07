import axios from "axios";

const BASE_URL_IMAGE = process.env.CLOUDNERY_IMAGE_UPLOAD;

//to check if admin is exists
export const upload_Image = async (image) => {
  console.warn(BASE_URL_IMAGE);
  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/dlrgh9gam/image/upload`,image);
    return response;
  } catch (error) {
    throw error;
  }
};