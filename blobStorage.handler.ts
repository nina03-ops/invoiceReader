import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageHandler {
  getBlockBlobClient(filename: string): BlockBlobClient {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING,
    );
    const blobContainer = blobServiceClient.getContainerClient(
      process.env.AZURE_STORAGE_CONTAINER_NAME,
    );
    return blobContainer.getBlockBlobClient(filename);
  }

  async uploadFile(file: Express.Multer.File) {
    const blockBlobClient = this.getBlockBlobClient(file.originalname);
    await blockBlobClient.uploadData(file.buffer);
  }
}
