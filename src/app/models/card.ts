import { Product } from "./product.repository";

export interface ICard{
    product: Product;
    productCount: number;
}