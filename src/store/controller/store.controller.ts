import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StoreService } from '../services/store.service';
import { StoreDTO, StoreUpdateDTO } from '../dto/store.dto';

@Controller('stores')
export class StoreController{

    constructor(
        private readonly _serviceStore: StoreService
    ){}

        @Post('create')
        async createStore(@Body() body: StoreDTO) {
        try {
            const store = await this._serviceStore.createStore(body);            
            return { success: true, data: store };
        } catch (error) {
            const errorMessage = error.message.split(' :: ')[1].trim();
            return { success: false, error: errorMessage };
        }
    }

    @Get('all')
    public async getAllStore(){
        return this._serviceStore.findAllStore()
    }  
    
    @Get(':id')
    public async getStoreById(@Param('id') id: string){
        return this._serviceStore.findOneStore(id)
    }
    
    @Put('update/:id')
    public async updateStore(@Body() body: StoreUpdateDTO, @Param('id') id:string){
        return this._serviceStore.updateStore(body, id)
    }

    @Delete(':id')
    public async deleteStore(@Param('id') id: string){
        return this._serviceStore.deleteStore(id)
    }
   
}

