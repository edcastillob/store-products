import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductType } from 'src/constants/product.type';

export class ProductDTO {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
  
  @ApiProperty({
    enum: ProductType,
    enumName: 'ProductType',
    description: 'Tipo del producto: Perecedero o No_perecedero',
    example: ProductType.Perecedero,
  })
  @IsNotEmpty()
  @IsEnum(ProductType)
  type: ProductType;
}

export class ProductUpdateDTO {

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price: number;
  
  @ApiProperty()
  @IsOptional()
  @IsEnum(ProductType)
  type: ProductType;
}
