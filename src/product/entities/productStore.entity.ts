import { Entity, ManyToOne } from "typeorm";
import { ProductEntity } from "./product.entity";
import { BaseEntity } from "../../config/base.entity";
import { StoreEntity } from "../../store/entities/store.entity";


    @Entity({name: 'product_store'})
    export class ProductStoreEntity extends BaseEntity {

        @ManyToOne(() => ProductEntity, (product) => product.storesIncludes)
        product: ProductEntity;

        @ManyToOne(() => StoreEntity, (store) => store.productsIncludes)
        store: StoreEntity;
    }

