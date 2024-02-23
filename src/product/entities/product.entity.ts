import { Column, Entity, OneToMany } from 'typeorm';
import { ProductStoreEntity } from './productStore.entity'; 
import { BaseEntity } from '../../config/base.entity';
import { IProduct } from '../../interfaces/product.interface';
import { ProductType } from '../../constants/product.type';


@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity implements IProduct {
  @Column({unique: true})
  name: string;

  @Column()
  price: number;

  @Column({type: 'enum', enum: ProductType})
  type: ProductType;

  @Column()
  image: string;

  @OneToMany(() => ProductStoreEntity, (productsStores) => productsStores.product)
  storesIncludes: ProductStoreEntity[]
}
