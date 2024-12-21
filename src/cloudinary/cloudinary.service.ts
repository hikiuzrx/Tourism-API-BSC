import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.APY_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
     return new Promise((resolve, reject) => {
       const upload = cloudinary.uploader.upload_stream(
         (error, result) => {
           if (error) return reject(error);
           resolve(result);
         }
       );
 
       Readable.from(file.buffer).pipe(upload);
     })
   }
}
