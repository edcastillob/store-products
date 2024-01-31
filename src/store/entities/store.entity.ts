import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { IStore } from '../../interfaces/store.interface';
import { ProductStoreEntity } from '../../product/entities/productStore.entity';

@Entity({ name: 'store' })
export class StoreEntity extends BaseEntity implements IStore {
  @Column({ unique: true })
  name: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @OneToMany(
    () => ProductStoreEntity, 
    (productsStores) => productsStores.store)  
  
    productsIncludes: ProductStoreEntity[];
}
