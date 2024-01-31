import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { StoreService } from '../services/store.service';
import { StoreDTO, StoreUpdateDTO } from '../dto/store.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';


@ApiTags('Store')
@Controller('stores')
export class StoreController{

    constructor(
        private readonly _serviceStore: StoreService
    ){}

        @ApiBody({ type:  StoreDTO, description: 'City: Solo 3 Caracteres de la Ciudad'}) 
        @Post('create')
        async createStore(@Body() body: StoreDTO) {
        try {
            const store = await this._serviceStore.createStore(body);            
            return { success: true, data: store };
        } catch (error) {
            if (error instanceof HttpException) {
                return { success: false, error: error.getResponse() };
            } else {
                const errorMessage = error.message.split(' :: ')[1].trim();
                return { success: false, error: errorMessage };
            }
        
        }
    }

    @ApiOperation({ summary: 'Obtiene todas las tiendas', description: 'Endpoint para obtener todas las tiendas.' })
    @Get('all')
    public async getAllStore(){
        return this._serviceStore.findAllStore()
    }  
    
    @ApiParam({name: 'id', description: 'ID de Store Buscar'})
    @Get(':id')
    public async getStoreById(@Param('id') id: string){
        return this._serviceStore.findOneStore(id)
    }
    
    @ApiParam({name: 'id', description: 'ID de Store Actualizar'})
    @Put('update/:id')
    public async updateStore(@Body() body: StoreUpdateDTO, @Param('id') id:string){
        return this._serviceStore.updateStore(body, id)
    }
    
    @ApiParam({name: 'id', description: 'ID de Store Eliminar'})
    @Delete(':id')
    public async deleteStore(@Param('id') id: string){
        return this._serviceStore.deleteStore(id)
    }
   
}

