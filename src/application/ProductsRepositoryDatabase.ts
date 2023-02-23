import Database from "../infra/database/Database";
import Product from "./Product";
import ProductRepository from "./ProductRepository";

export default class ProductRepositoryDatabase extends Database implements ProductRepository {
  async getAllProducts(): Promise<Product[]> {
    const products = await this.query(`SELECT * FROM products`);
    return products.map(product => this.mapResultToProduct(product));
  }

  async getProductById(idProduct: number): Promise<Product | null> {
    const [product] = await this.query(`SELECT * FROM products WHERE id_product = ${idProduct}`);
    return !product ? null : this.mapResultToProduct(product);
  }

  private mapResultToProduct(product: any) {
    return new Product({
      idProduct: product.id_product,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      height: parseFloat(product.height),
      width: parseFloat(product.width),
      depth: parseFloat(product.depth),
      weight: parseFloat(product.weight)
    });
  }
}
