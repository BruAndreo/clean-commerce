import Product from "./Product";

export default interface ProductRepository {
  getAllProducts(): Product[];
  getProductById(idProduct: number): Product | null;
}
