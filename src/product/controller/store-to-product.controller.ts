import {  Controller, Get, Param, Post } from '@nestjs/common';
import { StoreToProductService } from '../services/store-to-product.service';

@Controller('product')
export class StoreToProductController {
    constructor(
        private readonly _storeToProduct: StoreToProductService
    ){}


// Agregar productos a la tienda
@Post(':productId/store/:storeId')
public async addStoreToProduct(
    @Param('productId') productId: string,
    @Param('storeId') storeId: string,
) {
    try {
        const result = await this._storeToProduct.addStoreToProduct(productId, storeId);
        return { success: true, data: result };
    } catch (error) {
        const errorMessage = error.message.split(' :: ')[1].trim();
            return { success: false, error: errorMessage };
    }
}

@Get(':productId/stores')
  public async findStoresFromProduct(
    @Param('productId') productId: string,
  ) {
    try {
      const stores = await this._storeToProduct.findStoresFromProduct(
        productId,
      );

      return {
        success: true,
        data: stores,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

}
