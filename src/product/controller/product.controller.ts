import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductDTO, ProductUpdateDTO } from '../dto/product.dto';

@Controller('products')
export class ProductController {
    constructor(
        private readonly _productService: ProductService
    ){}

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

    @Get('all')
    public async getAllProducts(){
        return this._productService.findAllProduct()
    }  
    
    @Get(':id')
    public async getProductById(@Param('id') id: string){
        return this._productService.findOneProduct(id)
    }
    
    @Put('update/:id')
    public async updateProduct(@Body() body: ProductUpdateDTO, @Param('id') id:string){
        return this._productService.updateProduct(body, id)
    }

    @Delete(':id')
    public async deleteProductBy(@Param('id') id: string){
        return this._productService.deleteProduct(id)
    }

}

