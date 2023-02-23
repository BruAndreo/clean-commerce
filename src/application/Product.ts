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
    this.setHeight(product.height);
    this.setWidth(product.width);
    this.setDepth(product.depth);
    this.setWeight(product.weight);
  }

  private setHeight(height: number) {
    if (height <= 0) throw new Error("Height can't be equal or less than zero");
    this.height = height;
  }

  private setWidth(width: number) {
    if (width <= 0) throw new Error("Width can't be equal or less than zero");
    this.width = width;
  }

  private setWeight(weight: number) {
    if (weight <= 0) throw new Error("Weight can't be equal or less than zero");
    this.weight = weight;
  }

  private setDepth(depth: number) {
    if (depth <= 0) throw new Error("Depth can't be equal or less than zero");
    this.depth = depth;
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
