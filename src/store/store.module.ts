import { Module } from '@nestjs/common';
import { StoreController } from './controller/store.controller';
import { StoreService } from './services/store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './entities/store.entity';
import { ProductStoreEntity } from 'src/product/entities/productStore.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([StoreEntity])
  ],
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}
