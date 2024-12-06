import {v2 as cloudinary} from 'cloudinary';
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMedia = async (file) => {
    try{
        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: 'auto'
        });
        return uploadResponse
    }
    catch(error){
        console.log(error);

    }
}
const deleteMedia = async (publicId) => {
    try{
        const deleteResponse = await cloudinary.uploader.destroy(publicId);
        return deleteResponse
    }
    catch(error){
        console.log(error);
    }
}
const deleteVideo = async (publicId) => {
    try{
        const deleteResponse = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'video'
        });
        return deleteResponse
    }
    catch(error){
        console.log(error);
    }
}
export {uploadMedia, deleteMedia , deleteVideo}