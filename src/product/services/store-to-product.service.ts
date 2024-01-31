import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductStoreEntity } from '../entities/productStore.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationsStoreProductDTO } from 'src/store/dto/store-product.dto';
import { ProductService } from './product.service';
import { StoreService } from 'src/store/services/store.service';
import { ErrorManager } from 'src/config/error.manager';

@Injectable()
export class StoreToProductService {
  constructor(
    @InjectRepository(ProductStoreEntity)
    private readonly _productStoreRepository: Repository<ProductStoreEntity>,
    private readonly _productService: ProductService,
    private readonly _storeService: StoreService,
  ) {}
  //    Servicio para agregar productos a la tienda

  public async addStoreToProduct(
    productId: string,
    storeId: string,
  ): Promise<RelationsStoreProductDTO> {
    try {
      const product = await this._productService.findOneProduct(productId);
      const store = await this._storeService.findOneStore(storeId);

      const storeToProduct = new ProductStoreEntity();
      storeToProduct.product = product;
      storeToProduct.store = store;

      return await this._productStoreRepository.save(storeToProduct);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Invalid store or product IDs',
        });
      } else {
        throw new HttpException(
          {
            type: 'INTERNAL_SERVER_ERROR',
            message: 'Error creating store-to-product relationship',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  public async findStoresFromProduct(productId: string): Promise<any> {
    try {
      const product = await this._productService.findOneProduct(productId);

      if (!product) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Product not found',
        });
      }

      const productStores = await this._productStoreRepository.find({
        where: { product: { id: productId } },
        relations: ['store'],
      });
      console.log(productStores);

      const stores = productStores.map((ps) => ps.store);

      return stores;
    } catch (error) {
      if (error instanceof ErrorManager) {
        throw error;
      } else {
        throw new ErrorManager({
          type: 'INTERNAL_SERVER_ERROR',
          message: 'Error finding stores from product',
        });
      }
    }
  }
}
