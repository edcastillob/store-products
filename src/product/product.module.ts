import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controller/product.controller';

@Module({
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
