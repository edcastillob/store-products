import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { StoreEntity } from '../entities/store.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RelationsStoreProductDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  store: StoreEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  product: ProductEntity;
}

export class RelationsStoreProductUpdateDTO {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  store: StoreEntity;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  product: ProductEntity;
}
