export declare class UploadsController {
    uploadFile(file: Express.Multer.File): {
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        url: string;
    };
}
