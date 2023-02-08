import Product from "./Product";
import ProductRepository from "./ProductRepository";
import ProductsRepositoryJSON from "./ProductsRepositoryJSON";

export class Item {

  private product: Product;
  private price: number;
  private quantity!: number;

  constructor(idProduct: number, quantity: number = 1, readonly productRepository: ProductRepository = new ProductsRepositoryJSON()) {
    this.product = this.getProductById(idProduct);
    this.price = this.product.getPrice();
    this.setQuantity(quantity);
  }

  public getIdProduct() { return this.product.getIdItem(); }

  private setQuantity(quantity: number) {
    if (!this.isQuantityPositive(quantity)) throw new Error("Quantity is not valid");
    this.quantity = quantity;
  }

  private isQuantityPositive(quantity: number) {
    return quantity > 0;
  }

  private getProductById(idProduct: number) {
    const product = this.productRepository.getProductById(idProduct);

    if (!product) throw new Error("Product not exist");
    return product;
  }

  public getItemTotalAmount(): number {
    return this.quantity * this.price;
  }
}
