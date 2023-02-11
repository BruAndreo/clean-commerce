import { NewOrder, ProductItem } from "../types/NewOrder";
import Coupon from "./Coupon";
import CouponsRepository from "./CouponsRepository";
import CouponsRepositoryJSON from "./CouponsRepositoryJSON";
import Freight from "./Freight";
import { Item } from "./Item";
import User from "./User";

export default class Orders {
  private user!: User;
  private itensList: Item[] = [];
  private coupon!: Coupon | null;
  private to!: string;
  private from!: string;

  constructor(readonly couponRepository: CouponsRepository = new CouponsRepositoryJSON()) {
  }

  public create(order: NewOrder) {
    this.user = new User(order.user.name, order.user.cpf);
    this.setItensList(order.itens);
    this.coupon = order.coupon ? this.couponRepository.getCouponByCode(order.coupon) : null;
    this.to = order.to;
    this.from = order.from;
  }

  private setItensList(itensList: ProductItem[]) {
    for (const item of itensList) {
      const hasRepeat = itensList.filter(i => i.idProduct === item.idProduct);
      if (hasRepeat.length > 1) throw new Error("Item can't be repeated");
      this.itensList.push(new Item(item.idProduct, item.quantity));
    }
  }

  public totalAmount() {
    const fullValue = this.itensList.reduce((accumulator, atualItem) => accumulator + atualItem.getItemTotalAmount(), 0);
    const products = this.itensList.map(item => item.product)
    const freight = new Freight();
    const freightTax = freight.calcTotalTax(products, this.to, this.from);
    const discount = this.coupon ? this.coupon.calculateDiscountValue(fullValue) : 0;

    return (fullValue + freightTax) - discount;
  }
}
