import Product from "../models/Product";

export class Item {

    private name: string;
    private description: string;
    private price: number;
    private quantity: number;


    constructor(idItem: number, quantity: number = 1) {
        const product = this.getItemById(idItem);

        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.quantity = quantity;
    }

    private getItemById(idItem: number) {
        return Product.getById(idItem);
    }

    public getItemTotalAmount(): number {
        return this.quantity * this.price;
    }
}
