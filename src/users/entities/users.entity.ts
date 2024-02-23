import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../config/base.entity';
import { Column, Entity } from 'typeorm';
import { IUser } from '../interfaces/user.interface';

@Entity({name: 'users'})
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password?: string;

}
