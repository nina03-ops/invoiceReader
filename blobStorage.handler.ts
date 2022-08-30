import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from 'src/invoice/dto/create-invoice.dto';
import recognizeInvoices from 'src/scanner/scan';
import { InvoiceService } from './src/invoice/invoice.service';

@Injectable()
export class StorageHandler {
  constructor(
    private readonly invoiceService: InvoiceService,
  ) { }

  getBlockBlobClient(filename: string): BlockBlobClient {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING,
    );
    const blobContainer = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);
    return blobContainer.getBlockBlobClient(filename);
  }

  async uploadFile(file: Express.Multer.File) {
    //save blob
    const blockBlobClient = this.getBlockBlobClient(file.originalname);
    const formedPath = `https://scannerstorage03.blob.core.windows.net/invoices/${file.originalname}`;
    await blockBlobClient.uploadData(file.buffer);
    //scan photo using blob path
    let invoiceDto: CreateInvoiceDto;
    try {
      invoiceDto = await recognizeInvoices(formedPath);
    } catch (err: any) {
      console.error('The item encountered an error:', err);
    };
    //save scanned info in db
    this.invoiceService.create(invoiceDto);
  }
}
