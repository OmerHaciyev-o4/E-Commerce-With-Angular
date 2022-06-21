export interface IProduct{
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
}