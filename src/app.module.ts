import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV.trim()}.env`,
      isGlobal: true,
    }),
    ProductModule, 
    StoreModule
  ],
  
})
export class AppModule {}
