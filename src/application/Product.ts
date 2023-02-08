import { ProductDefinition } from "../types/ProductDefinition";

export default class Product {
  private idProduct: number;
  private name: string;
  private description: string;
  private price: number;
  private _height!: number;
  private _width!: number;
  private _depth!: number;
  private _weight!: number;

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

  private set height(height: number) {
    if (height <= 0) throw new Error("Height can't be equal or less than zero");
    this._height = height;
  }

  private set width(width: number) {
    if (width <= 0) throw new Error("Width can't be equal or less than zero");
    this._width = width;
  }

  private set depth(depth: number) {
    if (depth <= 0) throw new Error("Depth can't be equal or less than zero");
    this._depth = depth;
  }

  private set weight(weight: number) {
    if (weight <= 0) throw new Error("Weight can't be equal or less than zero");
    this._weight = weight;
  }

  public getIdItem() { return this.idProduct; }

  public getName() { return this.name; }

  public getDescription() { return this.description; }

  public getPrice() { return this.price; }

  public get height() { return this._height; }

  public get width() { return this._width; }

  public get weight() { return this._weight; }

  public get depth() { return this._depth; }
}
