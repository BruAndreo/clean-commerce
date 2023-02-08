import Product from "./Product";
import ProductRepository from "./ProductRepository";
import { productsList } from "../infra/database/ProductsDatabase";

export default class ProductsRepositoryJSON implements ProductRepository {
  getAllProducts(): Product[] {
    return productsList.map(product => new Product(product));
  }

  getProductById(idProduct: number): Product | null {
    const [product] = productsList.filter(product => product.idProduct === idProduct);

    if (!product) return null;
    return new Product(product);
  }
}
