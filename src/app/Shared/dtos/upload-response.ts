export interface UploadResponse {
  uploaded: boolean;
  fileName: string;
  storedFileName: string;
  fileUrl: string;
  errorCode: number;
}
