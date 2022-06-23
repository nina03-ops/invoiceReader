import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageHandler } from 'blobStorage.handler';
import recognizeInvoices from 'src/scanner/scan';

@Controller('/api/invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly storageHandler: StorageHandler,
  ) { }

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Post('/upload-file')
  @UseInterceptors(FileInterceptor('filename'))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<string> {
    await this.storageHandler.uploadFile(file);
    return 'uploaded';
  }

  @Get('/recognizeInvoice')
  findAll() {
    const invoice = recognizeInvoices();
    return invoice;
  }
}
