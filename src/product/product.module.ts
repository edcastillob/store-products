import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductStoreEntity } from './entities/productStore.entity';
import { StoreToProductService } from './services/store-to-product.service';
import { StoreToProductController } from './controller/store-to-product.controller';
import { StoreService } from 'src/store/services/store.service';
import { StoreEntity } from 'src/store/entities/store.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductEntity, ProductStoreEntity, StoreEntity])
  ],
  providers: [ProductService, StoreToProductService, StoreService],
  controllers: [ProductController, StoreToProductController]
})
export class ProductModule {}
