import { Injectable } from '@nestjs/common';
import { Invoice } from './invoice.model';
import { InvoiceRepository } from './invoice.repository';

@Injectable()
export class InvoiceService {
  // update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
  //   return `This action updates a #${id} invoice`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} invoice`;
  // }
  findOne // update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    (arg0: number) {
      throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async create(invoice: Invoice): Promise<Invoice> {
    return this.invoiceRepository.create(invoice);
  }

  // findAll() {
  //   return `This action returns all invoice`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} invoice`;
  // }

  // update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
  //   return `This action updates a #${id} invoice`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} invoice`;
  // }
}
