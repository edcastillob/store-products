import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductStoreEntity } from '../entities/productStore.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationsStoreProductDTO, RelationsStoreProductUpdateDTO } from 'src/store/dto/store-product.dto';
import { ProductService } from './product.service';
import { StoreService } from 'src/store/services/store.service';
import { ErrorManager } from 'src/config/error.manager';
import { IProduct } from 'src/interfaces/product.interface';
import { IProductStores, IStoreProducts } from 'src/interfaces/product-store.interface';

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
          { type: 'INTERNAL_SERVER_ERROR',
            message: 'Error creating store-to-product relationship',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

// Tiendas asociadas a un producto
  public async findStoresFromProduct(productId: string): Promise<IProductStores[]> {
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
      const stores = productStores.map((ps) => ps.store);

      return stores;
    } catch (error) {
        if (error.message.includes('not found')) {
            throw new ErrorManager({
              type: 'BAD_REQUEST',
              message: 'Invalid product',
            }),
            HttpStatus.INTERNAL_SERVER_ERROR     
      } else {
        throw new ErrorManager({
          type: 'INTERNAL_SERVER_ERROR',
          message: 'Error finding stores from product',
        });
      }
    }
  }

  // Productos asociados a una tienda
  public async findProductsFromStore(storeId: string): Promise<IStoreProducts[]> {
    try {
        const store = await this._storeService.findOneStore(storeId);
        if (!store) {
            throw new ErrorManager({
                type: 'BAD_REQUEST',
                message: 'store not found',
            });
        }
        const storeProducts = await this._productStoreRepository.find({
            where: { store: { id: storeId } },
            relations: ['product'],
        });
        const products = storeProducts.map((sp) => sp.product);
        return products;
    } catch (error) {        
        if (error.message.includes('not found')) {
            throw new ErrorManager({
                type: 'BAD_REQUEST',
                message: 'Invalid store',
            });
        } else {
            throw new HttpException(
                {
                    type: 'INTERNAL_SERVER_ERROR',
                    message: 'Error finding products from store',
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
  }

 // Actualizar tiendas asociadas a un producto
 public async updateStoresFromProduct(
    productId: string,
    updateDTO: RelationsStoreProductUpdateDTO,
  ): Promise<UpdateResult | object> {
    try {
      const product = await this._productService.findOneProduct(productId);
      if (!product) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Product not found',
        });
      }

      const updateResult = await this._productStoreRepository.update(
        { product: { id: productId } },
        updateDTO,
      );

      return ({"result": "register updated"});
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Invalid product',
        });
      } else {
        throw new ErrorManager({
          type: 'INTERNAL_SERVER_ERROR',
          message: 'Error updating stores from product',
        });
      }
    }
  }

  public async deleteStoreFromProduct(productId: string, storeId: string): Promise<void> {
    try {
      const product = await this._productService.findOneProduct(productId);
      const store = await this._storeService.findOneStore(storeId);
  
      if (!product || !store) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Invalid store or product IDs',
        });
      }
  
      await this._productStoreRepository.delete({ product, store });
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Invalid store or product IDs',
        });
      } else {
        throw new ErrorManager({
          type: 'INTERNAL_SERVER_ERROR',
          message: 'Error deleting store from product',
        });
      }
    }
  }

  async existRelation(productId: string, storeId: string): Promise<boolean> {
    
    const existingRelation = await this._productStoreRepository.findOne({
        where: {
            product: { id: productId },
            store: { id: storeId },
        },
    });
    return !!existingRelation;
}
}