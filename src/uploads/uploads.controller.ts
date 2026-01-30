import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${randomUUID()}${extname(
            file.originalname,
          )}`;
          cb(null, filename);
        },
      }),
      limits: { fileSize: 25 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowed = /\.(jpg|jpeg|png|gif|pdf|doc|docx)$/i;
        cb(null, allowed.test(file.originalname));
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`,
    };
  }
}
