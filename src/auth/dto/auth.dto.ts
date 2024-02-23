import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "../interfaces/auth.interface";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO implements AuthBody{
    
    @IsNotEmpty()
    @ApiProperty({description: "inserte usuario o email"})
    username: string;

    @ApiProperty({description: "Inserte Contraseña"})
    @IsNotEmpty()
    @IsString()
    password: string;
}