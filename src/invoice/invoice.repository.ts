import { Container } from '@azure/cosmos';
import { InjectModel } from '@nestjs/azure-database';
import { Logger, Injectable } from '@nestjs/common';
import { Invoice } from './invoice.model';

@Injectable()
export class InvoiceRepository {
  private logger = new Logger(this.constructor.name);
  constructor(@InjectModel(Invoice) private readonly container: Container) {}

  async create(item: Invoice): Promise<Invoice> {
    item.createdAt = new Date();
    const response = await this.container.items.create(item);
    this.logger.verbose(`Create RUs: ${response.requestCharge}`);
    return response.resource;
  }
}
