
export interface IProductStores {
    id:        string;
    createdAt: Date;
    updateAt:  Date;
    name:      string;
    city:      string;
    address:   string;
}

export interface IStoreProducts {
    id:        string;
    createdAt: Date;
    updateAt:  Date;
    name:      string;
    price:     number;
    type:      string;
}
