import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: process.env.CLOUD_NAME, // Folder name in Cloudinary
      public_id: file.originalname.split('.')[0], // Use original file name without extension
      resource_type: 'auto', // Auto-detect resource type (image, video, etc.)
    };
  },
});
