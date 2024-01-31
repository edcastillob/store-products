import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { StoreModule } from './store/store.module';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.source';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV.trim()}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({...DataSourceConfig }),
    ProductModule, 
    StoreModule
  ],
  
})
export class AppModule {}
