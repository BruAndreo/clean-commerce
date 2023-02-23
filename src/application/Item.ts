import Product from "./Product";

export class Item {

  public product: Product;
  private quantity!: number;

  constructor(product: Product, quantity: number = 1) {
    this.product = product;
    this.setQuantity(quantity);
  }

  private setQuantity(quantity: number) {
    if (!this.isQuantityPositive(quantity)) throw new Error("Quantity is not valid");
    this.quantity = quantity;
  }

  private isQuantityPositive(quantity: number) {
    return quantity > 0;
  }

  public getItemTotalAmount(): number {
    return this.quantity * this.product.getPrice();
  }
}
