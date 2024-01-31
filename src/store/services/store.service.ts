import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreEntity } from '../entities/store.entity';
import { DeleteResult, QueryFailedError, Repository, UpdateResult } from 'typeorm';
import { StoreDTO, StoreUpdateDTO } from '../dto/store.dto';
import { ErrorManager } from 'src/config/error.manager';

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(StoreEntity)
        private readonly _storeRepository: Repository<StoreEntity>       
    ){}

    public async createStore(body: StoreDTO): Promise<StoreEntity>{
        if (body.city.length !== 3) {
            throw new HttpException({
                error: 'The city code must be 3 characters',
            }, HttpStatus.LENGTH_REQUIRED);
        } 
        try {
            return await this._storeRepository.save(body)
        } catch (error) {
            if (error instanceof QueryFailedError && ( error.message.includes('unicidad'))) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'data uniqueness constraint',
                });
            }       
            throw new ErrorManager({
                type: 'INTERNAL_SERVER_ERROR',
                message: 'Error creating store',
            });
        }
    }

    public async findAllStore(): Promise<StoreEntity[]>{
        try {
            const stores: StoreEntity[] =  await this._storeRepository.find()
            if(stores.length === 0){
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message:'there are no stores for this search'
                })
            }
            return stores
        } catch (error) {
            throw new ErrorManager.createSignatureError(error.message)
        }
    }
    
    public async findOneStore(id: string): Promise<StoreEntity>{
        try {
            const store = await this._storeRepository
                .createQueryBuilder('store')
                .where({id})
                .getOne();
            
            if(!store){
                    throw new ErrorManager({
                        type: 'BAD_REQUEST',
                        message:'store not found'
                    })
                }
            return store

        } catch (error) {
            throw new ErrorManager.createSignatureError(error.message)
        }
    }

    public async updateStore(body: StoreUpdateDTO, id: string): Promise<StoreEntity |  UpdateResult | object> {   
        if (body.city.length !== 3) {
            throw new HttpException({
                error: 'The city code must be 3 characters',
            }, HttpStatus.LENGTH_REQUIRED);
        }   
        try {
            const storeUpdate: UpdateResult = await this._storeRepository.update(id, body);    
             if (storeUpdate.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message:'there are no stores for update'
                })
             }        
             return ({ "result":"successfully updated store"})
      } catch (error) {
        throw new ErrorManager.createSignatureError(error.message)  
      }
    }

    public async deleteStore(id: string): Promise<StoreEntity |  DeleteResult | object> {      
        try {
            const storeDelete: DeleteResult = await this._storeRepository.delete(id);    
             if (storeDelete.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message:'there are no stores for delete'
                })
             }        
             return ({ "result":"successfully deleted store"})
      } catch (error) {
        throw new ErrorManager.createSignatureError(error.message) 
      }
    }   
}
