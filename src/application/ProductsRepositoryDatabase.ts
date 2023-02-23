import Database from "../infra/database/Database";
import Product from "./Product";
import ProductRepository from "./ProductRepository";

export default class ProductRepositoryDatabase extends Database implements ProductRepository {
  async getAllProducts(): Promise<Product[]> {
    const products = await this.query(`SELECT * FROM products`);

    return products.map(product => new Product({
      idProduct: product.id_product,
      name: product.name,
      description: product.description,
      price: product.price,
      height: Number(product.height),
      width: Number(product.width),
      depth: Number(product.depth),
      weight: Number(product.weight)
    }));
  }

  async getProductById(idProduct: number): Promise<Product | null> {
    const [product] = await this.query(`SELECT * FROM products WHERE id_product = ${idProduct}`);

    return !product ? null : new Product({
      idProduct: product.id_product,
      name: product.name,
      description: product.description,
      price: product.price,
      height: Number(product.height),
      width: Number(product.width),
      depth: Number(product.depth),
      weight: Number(product.weight)
    });
  }
}
