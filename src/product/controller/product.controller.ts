import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductDTO, ProductUpdateDTO } from '../dto/product.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(
        private readonly _productService: ProductService
    ){}    
    
        @ApiOperation({ summary: 'Crear productos', description: 'Endpoint para Crear Productos.' })
        @ApiBody({ type: ProductDTO, description: 'Type: Perecedero ó No_perecedero' })       
        @Post('create')
        public async createProduct(@Body() productDTO: ProductDTO) {
        try {
            const product = await this._productService.createProduct(productDTO);            
            return { success: true, data: product };
        } catch (error) {
            const errorMessage = error.message.split(' :: ')[1].trim();
            return { success: false, error: errorMessage };
        }
    }

    
    @ApiOperation({ summary: 'Obtiene todos los productos', description: 'Endpoint para obtener todos los productos.' })
    @Get('all')
    public async getAllProducts(){
        return this._productService.findAllProduct()
    }  
    
    @ApiParam({name:'id'})
    @Get(':id')
    public async getProductById(@Param('id') id: string){
        return this._productService.findOneProduct(id)
    }
    
    @ApiParam({name:'id'})
    @Put('update/:id')
    public async updateProduct(@Body() body: ProductUpdateDTO, @Param('id') id:string){
        return this._productService.updateProduct(body, id)
    }

    @ApiParam({name:'id'})
    @Delete(':id')
    public async deleteProductBy(@Param('id') id: string){
        return this._productService.deleteProduct(id)
    }

}

