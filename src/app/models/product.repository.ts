import { IProduct } from "./product";

export class Product implements IProduct{
    id: number;
    productName: string;
    description: string;
    imageUrl: string;
    unitPrice: number;
    unitsInStock: number;
    brandId: number;
    colorId: number;
    categoryId: number;
    addToCard: boolean;

    getState(): string{
        return this.addToCard == false? "add to card" : "remove from card";
    }
}