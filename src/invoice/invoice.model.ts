import {
  CosmosPartitionKey,
  CosmosDateTime,
  CosmosUniqueKey,
} from '@nestjs/azure-database';

@CosmosPartitionKey('type')
export class Invoice {
  id?: string;
  provider: string;
  type: string;

  // @CosmosUniqueKey() phoneNumber: string;
  @CosmosDateTime() createdAt?: Date;
  @CosmosDateTime() updatedAt?: Date;
}
