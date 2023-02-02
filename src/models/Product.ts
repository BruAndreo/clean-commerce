import { productsList } from "../infra/database/ProductsDatabase";

export default class Product {
  private idItem: number;
  private name: string;
  private description: string;
  private price: number;

  static getById(idItem): Product {
    const product = productsList.filter(product => product.idItem === idItem).at(0);

    if (!product) throw new Error("Product does not exist")

    return new Product(product.idItem, product.name, product.description, product.price);
  }

  private constructor(idItem: number, name: string, description: string, price: number) {
    this.idItem = idItem;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  getIdItem() { return this.idItem; }

  getName() { return this.name; }

  getDescription() { return this.description; }

  getPrice() { return this.price; }
}
