import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService
    ){}

    @ApiBody({type: AuthDTO, description: 'Inserta credenciales del usuario'})
    @ApiOperation({ summary: 'Login de usuario' })
    @Post('login')
    async login(@Body(){username, password}:AuthDTO){
        const userValidate = await this._authService.validateUser(username, password)
        if(!userValidate){
            throw new UnauthorizedException('Datos inválidos, revise sus credenciales')            
        }
       const jwt = await this._authService.generateJWT(userValidate)
       return jwt; 
    }
}
