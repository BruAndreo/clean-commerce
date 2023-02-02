import Product from "../models/Product";

export class Item {

    private name: string;
    private description: string;
    private price: number;
    private quantity!: number;


    constructor(idItem: number, quantity: number = 1) {
        const product = this.getItemById(idItem);

        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.setQuantity(quantity);
    }

    private setQuantity(quantity: number) {
        if (!this.isQuantityPositive(quantity)) throw new Error("Quantity is not valid");
        this.quantity = quantity;
    }

    private isQuantityPositive(quantity: number) {
        return quantity > 0;
    }

    private getItemById(idItem: number) {
        return Product.getById(idItem);
    }

    public getItemTotalAmount(): number {
        return this.quantity * this.price;
    }
}
