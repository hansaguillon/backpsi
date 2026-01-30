import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  buildResponse(file: Express.Multer.File) {
    return {
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`,
    };
  }
}