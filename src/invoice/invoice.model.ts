import { CosmosPartitionKey, CosmosDateTime } from '@nestjs/azure-database';

@CosmosPartitionKey('type')
export class Invoice {
  id?: string;
  provider: string;
  type: string;

  @CosmosDateTime() createdAt?: Date;
  @CosmosDateTime() updatedAt?: Date;
}
