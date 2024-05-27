import { Product } from "./product"

export interface Cart {
    productsCart: ProductCart[]

}

export interface ProductCart {
    product: Product,
    orderQuantity: number
}