import { ProductDefinition } from "../types/ProductDefinition";

export default class Product {
  private idProduct: number;
  private name: string;
  private description: string;
  private price: number;
  private height!: number;
  private width!: number;
  private depth!: number;
  private weight!: number;

  public constructor(product: ProductDefinition) {
    this.idProduct = product.idProduct;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.height = product.height;
    this.width = product.width;
    this.depth = product.depth;
    this.weight = product.weight;
  }

  public getId() { return this.idProduct; }

  public getIdItem() { return this.idProduct; }

  public getName() { return this.name; }

  public getDescription() { return this.description; }

  public getPrice() { return this.price; }

  public getVolume() {
    return (this.height / 100) * (this.width / 100) * (this.depth / 100);
  }

  public getDensity() {
    return this.weight / this.getVolume();
  }
}
