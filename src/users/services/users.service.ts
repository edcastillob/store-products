import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdatedUserDTO, UserDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/config/error.manager';
import { PaginationQueryDTO } from '../dto/pagination-query.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UserEntity> {
    try {
      body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      const user = await this._userRepository.save(body);      
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  public async findUsers({ count: count, page: page }: PaginationQueryDTO): Promise<UserEntity[]> {
    try {
        const users: UserEntity[] = await this._userRepository.find({ skip: page, take: count });
      if(users.length === 0){
        throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'No existen usuarios registrados'
        })
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }
  public async findUserById(id: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this._userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
        if(!user){
            throw new ErrorManager({
                type: 'BAD_REQUEST',
                message: 'El usuario no existe'
            })
        }
        return user;
    } catch (error) {
        throw ErrorManager.createSignatureError(error.message)
    }
  }
  public async updateUser(body: UpdatedUserDTO, id: string): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this._userRepository.update(id, body)
      if(user.affected === 0){
        throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'Error al actualizar el usuario, verifique su información '
        })
      }
      return user
    } catch (error) {
        throw ErrorManager.createSignatureError(error.message)
    }
  }
  public async deleteUser( id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this._userRepository.delete(id)
      if(user.affected === 0){
        throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'No se pudo eliminar el usuario'
        })
      }
        return user;      
    } catch (error) {
        throw ErrorManager.createSignatureError(error.message)
    }
}

public async findBy({key, value}:{key: keyof UserDTO, value: any}){
    try {
        const user: UserEntity = await this._userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({[key]: value})
        .getOne()

    return user;
    } catch (error) {
        throw ErrorManager.createSignatureError(error.message)        
    }
 }
}
