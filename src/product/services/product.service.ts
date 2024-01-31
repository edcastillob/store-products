import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { DeleteResult, QueryFailedError, Repository, UpdateResult } from 'typeorm';
import { ProductDTO, ProductUpdateDTO } from '../dto/product.dto';
import { ErrorManager } from 'src/config/error.manager';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly _productRepository: Repository<ProductEntity>,       
    ){}


    public async createProduct(body: ProductDTO): Promise<ProductEntity>{
        try {
            return await this._productRepository.save(body)
        } catch (error) {
            if (error instanceof QueryFailedError && ( error.message.includes('unicidad'))) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'data uniqueness constraint',
                });
            }         
            throw new ErrorManager({
                type: 'INTERNAL_SERVER_ERROR',
                message: error,
            });          
        }
    }

    public async findAllProduct(): Promise<ProductEntity[]>{
        try {
            const products: ProductEntity[] = await this._productRepository.find();
            if(products.length === 0){
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message:'there are no products for this search'
                })
            }
            return products
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)           
        }
    }
    
    public async findOneProduct(id: string): Promise<ProductEntity>{
        try {
            const product: ProductEntity = await this._productRepository
                .createQueryBuilder('product')
                .where({id})
                .getOne();
            
                if(!product){
                    throw new ErrorManager({
                        type: 'BAD_REQUEST',
                        message:'product not found'
                    })
                }
                return product

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)       
        }
    }
    

    public async updateProduct(body: ProductUpdateDTO, id: string): Promise<ProductEntity |  UpdateResult | object> {      
        try {
            const productUpdate: UpdateResult = await this._productRepository.update(id, body);
    
             if (productUpdate.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message:'there are no products for update'
                })
             }        
        return ({ "result":"successfully updated product"})
      } catch (error) {
        throw ErrorManager.createSignatureError(error.message)  
      }
    }

    public async deleteProduct(id: string): Promise<ProductEntity |  DeleteResult | object> {      
        try {
            const productDelete: DeleteResult = await this._productRepository.delete(id);    
             if (productDelete.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message:'there are no products for delete'
                })
             }       
             return ({ "result":"successfully deleted product"})
      } catch (error) {
        throw ErrorManager.createSignatureError(error.message)    
      }
    }
  
}
