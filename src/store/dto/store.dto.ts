import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class StoreDTO {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}

export class StoreUpdateDTO {

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  address: string;
}
