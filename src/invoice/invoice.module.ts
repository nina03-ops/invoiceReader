import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Invoice } from './invoice.model';
import { InvoiceRepository } from './invoice.repository';

@Module({
  imports: [AzureCosmosDbModule.forFeature([{ dto: Invoice }])],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository],
})
export class InvoiceModule {}
