import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdatedUserDTO, UserDTO } from '../dto/user.dto';
import { PaginationQueryDTO } from '../dto/pagination-query.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
    constructor(
        private readonly _userService: UsersService,
    ){}

    @ApiBody({type: UserDTO, description: 'Inserta los datos del Usuario'})
    @ApiOperation({ summary: 'Registro de Usuario' })
    @Post('register')
    public async registerUser(@Body() body: UserDTO) {
        try {
            const newUser = await this._userService.createUser(body);
            return {
                success: true,
                data: newUser
            };
        } catch (error) {
            let errorMessage = error.message;
            if (errorMessage.includes('unicidad')) {
                errorMessage = 'Ya existe un usuario con ese email ó username.';
            }    
            return {
                success: false,
                error: errorMessage
            };
        }
    }
    
    @ApiOperation({ summary: 'Todos los usuarios ' })
    @Get('all')
    public async findAllUsers(@Query() pagination: PaginationQueryDTO){
        try {
        const allUsers = await this._userService.findUsers(pagination)
        return {
            success: true,
            data: allUsers,
        }            
        } catch (error) {
            const errorMessage = error.message.split(' :: ')[1];
            return{
                success: false,
                error: errorMessage
            }
        }
    }



    @ApiParam({name: 'id', description: 'Inserta el ID del Usuario'})
    @ApiOperation({ summary: 'Busqueda de Usuario por ID' })
    @Get(':id')
    public async findUserById(@Param('id') id: string){
        try {
        const user = await this._userService.findUserById(id)
        return {
            success: true,
            data: user,
        }            
        } catch (error) {
            const errorMessage = error.message.split(' :: ')[1];
            return{
                success: false,
                error: errorMessage
            }
        }
    }

    @ApiParam({name: 'id', description: 'Inserta el ID del Usuario'})
    @ApiOperation({ summary: 'Actualizar Datos del Usuario' })
    @Put(':id')
    public async updateUser(@Body() body: UpdatedUserDTO, @Param('id') id: string){
        try {
        const user = await this._userService.updateUser(body, id)
        return {
            success: true,
            response: 'Usuario actualizado correctamente',
        }            
        } catch (error) {
            const errorMessage = error.message.split(' :: ')[1];
            return{
                success: false,
                error: errorMessage
            }
        }
    }

    @ApiParam({name: 'id', description: 'Inserta el ID del Usuario'})
    @ApiOperation({ summary: 'Eliminar Usuario' })
    @Delete(':id')
    public async DeleteUser(@Param('id') id: string){
        try {
        await this._userService.deleteUser(id)
        return {
            success: true,
            response: 'Usuario eliminado exitosamente',
        }            
        } catch (error) {
            const errorMessage = error.message.split(' :: ')[1];
            return{
                success: false,
                error: errorMessage
            }
        }
    }



}

