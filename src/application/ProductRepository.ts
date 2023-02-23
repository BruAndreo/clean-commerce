import Product from "./Product";

export default interface ProductRepository {
  getAllProducts(): Product[] | Promise<Product[]>;
  getProductById(idProduct: number): Product | null | Promise<Product | null>;
}
