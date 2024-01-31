import {  Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { StoreToProductService } from '../services/store-to-product.service';
import { RelationsStoreProductDTO, RelationsStoreProductUpdateDTO } from 'src/store/dto/store-product.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ErrorManager } from 'src/config/error.manager';

@ApiTags('Product to Store')
@Controller('product')
export class StoreToProductController {
    constructor(
        private readonly _storeToProduct: StoreToProductService
    ){}


// Agregar productos a la tienda
@ApiBody({ type:  RelationsStoreProductDTO, description: 'Relacion Product-Store'}) 
@ApiOperation({ summary: 'Asociar Producto con Tienda' })
@Post(':productId/store/:storeId')
public async addStoreToProduct(
    @Param('productId') productId: string,
    @Param('storeId') storeId: string,
) {
  const existRelation = await this._storeToProduct.existRelation(productId, storeId);
  try {
  if (existRelation) {            
      throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'The relationship between the product and the store already exists',
      });
}
  const result = await this._storeToProduct.addStoreToProduct(productId, storeId);
        return { success: true, data: result };
      } catch (error) {
        if (error instanceof HttpException) {
            return { success: false, error: error.getResponse() };
        } else {
            const errorMessage = error.message.split(' :: ')[1].trim();
            return { success: false, error: errorMessage };
        }
    
    }
    
}


@ApiOperation({ summary: 'Tiendas asociadas a un producto' })
@ApiParam({ name: 'productId', description: 'ID del producto' })
@Get(':productId/stores')
  public async findStoresFromProduct(
    @Param('productId') productId: string,
  ) {
    try {
      const stores = await this._storeToProduct.findStoresFromProduct(productId);
      return {success: true, data: stores};
    } catch (error) {
        const errorMessage = error.message.split(' :: ')[1].trim();
        return { success: false, error: errorMessage };
      };
    }

       
  @ApiOperation({ summary: 'Productos asociados a una tienda' })
  @ApiParam({ name: 'storeId', description: 'ID del store' })
  @Get(':storeId/products')
  public async findProductsFromStore(@Param('storeId') storeId: string) {
    try {
      const products = await this._storeToProduct.findProductsFromStore(storeId);
      return {success: true, data: products};
    } catch (error) {
        const errorMessage = error.message.split(' :: ')[1].trim();
        return { success: false, error: errorMessage };
      };
    }

    
  @ApiOperation({ summary: 'Actualizar tiendas asociadas a un producto' })
  @ApiParam({name: 'productId', description: 'ID de Producto'})
  @Put(':productId/stores')
  public async updateStoresFromProduct(
    @Param('productId') productId: string,
    @Body() updateDTO: RelationsStoreProductUpdateDTO
  ) {
    try {
      const result = await this._storeToProduct.updateStoresFromProduct(productId, updateDTO);
      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error.message.split(' :: ')[1].trim();
      return { success: false, error: errorMessage };
    }
  }
  // Eliminar tienda asociada a un producto
@ApiParam({name: 'productId', description: 'ID de Producto'})
@Delete(':productId/store/:storeId')
public async deleteStoreFromProduct(
  @Param('productId') productId: string,
  @Param('storeId') storeId: string,
) {
  try {
      const existRelation = await this._storeToProduct.existRelation(productId, storeId);

      if (existRelation) {
          await this._storeToProduct.deleteStoreFromProduct(productId, storeId);
          return { success: true, message: 'Store deleted from product' };
      } else {
          throw new ErrorManager({
              type: 'BAD_REQUEST',
              message: 'The relationship between the product and the store does not exist',
          });
      }
  } catch (error) {     
          const errorMessage = error.message.split(' :: ')[1].trim();
          return ({  error: errorMessage });
      
  }
}
}
  


