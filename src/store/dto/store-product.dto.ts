import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { StoreEntity } from '../entities/store.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

export class RelationsStoreProductDTO {
  @IsNotEmpty()
  @IsUUID()
  store: StoreEntity;

  @IsNotEmpty()
  @IsUUID()
  product: ProductEntity;
}

export class RelationsStoreProductUpdateDTO {
  @IsOptional()
  @IsUUID()
  store: StoreEntity;

  @IsOptional()
  @IsUUID()
  product: ProductEntity;
}
