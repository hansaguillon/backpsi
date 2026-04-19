export declare class UploadsService {
    buildResponse(file: Express.Multer.File): {
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        url: string;
    };
}
