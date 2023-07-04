export type Product = {
    id: string,
    name: string ,
    description: string ,
    price: number ,
    product_type_id: string ,
    productType: ProductType | null ,
    images_path: string ,
    created_at: string ,
}

export type ProductType = {
    id: string,
    name: string,
    percentage_tax: number,
    created_at: string,
}