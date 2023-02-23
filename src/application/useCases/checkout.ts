import { NewOrder, ProductItem } from "../../types/NewOrder";
import CouponsRepository from "../CouponsRepository";
import CouponsRepositoryJSON from "../CouponsRepositoryJSON";
import Order from "../entities/Order";
import Freight from "../Freight";
import OrderRepository from "../OrderRepository";
import OrderRepositoryJSON from "../OrderRepositoryJSON";
import Product from "../Product";
import ProductRepository from "../ProductRepository";
import ProductRepositoryDatabase from "../ProductsRepositoryDatabase";
import ProductsRepositoryJSON from "../ProductsRepositoryJSON";
import User from "../User";

export default class Checkout {
  private orderRespository: OrderRepository;
  private productRepository: ProductRepository;
  private couponRepository: CouponsRepository;

  private user!: User;
  private order!: Order;

  constructor(
    orderRepository: OrderRepository = new OrderRepositoryJSON(),
    productRepository: ProductRepository = new ProductRepositoryDatabase(),
    couponRepository: CouponsRepository = new CouponsRepositoryJSON()
  ) {
    this.orderRespository = orderRepository;
    this.productRepository = productRepository;
    this.couponRepository = couponRepository;
  }

  public async createOrder(orderInput: NewOrder) {
    const {user, itens, coupon, to, from} = orderInput;
    this.user = new User(user.name, user.cpf);
    this.order = new Order(await this.prepareItens(itens), await this.orderRespository.getSequence() + 1);

    if (coupon) {
      const couponLoaded = await this.couponRepository.getCouponByCode(coupon);
      if (couponLoaded) {
        this.order.setCoupon(couponLoaded);
      }
    }

    const freight = new Freight();
    const freightTax = freight.calcTotalTax(this.order.getProducts(), to, from);

    // calcular frete
    // salvar order
    // salvar itens
    // retornar { code, totalAmount, discount, freight, total }

    return {
      code: this.order.getCode(),
      totalAmount: this.order.totalAmount(),
      discount: this.order.getDiscount(),
      freight: freightTax,
      total: this.order.total() + freightTax
    };
  }

  private async prepareItens(itens: ProductItem[]): Promise<productItem[]> {
    this.validateDuplicatedProducts(itens);

    return Promise.all(itens.map(async item => ({
      product: await this.getProduct(item.idProduct),
      quantity: item.quantity
    })));
  }

  private validateDuplicatedProducts(itensList: ProductItem[]) {
    for (const item of itensList) {
      const hasRepeat = itensList.filter(i => i.idProduct === item.idProduct);
      if (hasRepeat.length > 1) throw new Error("Product can't be repeated");
    }
  }

  private async getProduct(idProduct: number): Promise<Product> {
    const product = await this.productRepository.getProductById(idProduct);
    if (!product) throw new Error("Product not exist");
    return product;
  }
}

type productItem = {
  product: Product,
  quantity: number
}
