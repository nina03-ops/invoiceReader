import { Injectable } from '@nestjs/common';
import { Invoice } from './invoice.model';
import { InvoiceRepository } from './invoice.repository';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async create(invoice: Invoice): Promise<Invoice> {
    return this.invoiceRepository.create(invoice);
  }
}
