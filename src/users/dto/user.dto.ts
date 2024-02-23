import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()  
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()  
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsString()  
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()  
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()  
  @ApiProperty()
  password: string;
}

export class UpdatedUserDTO {
  @IsOptional()
  @IsString()  
  @ApiProperty()
  firstName: string;

  @IsOptional()
  @IsString()  
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsString()  
  @ApiProperty()
  username: string;

  @IsOptional()
  @IsString()  
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()  
  @ApiProperty()
  password: string;
}
