import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { StoreModule } from './store/store.module';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV.trim()}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({...DataSourceConfig }),
    ProductModule, 
    StoreModule,
    UsersModule,
    AuthModule
  ],
  
})
export class AppModule {}
