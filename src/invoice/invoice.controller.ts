import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageHandler } from 'blobStorage.handler';

@Controller('/api/invoice')
export class InvoiceController {
  constructor(
    private readonly storageHandler: StorageHandler,
  ) { }

  @Post('/upload-file')
  @UseInterceptors(FileInterceptor('filename'))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<string> {
    await this.storageHandler.uploadFile(file);
    return 'uploaded'
  }

}
