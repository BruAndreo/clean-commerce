import Coupon from "./Coupon";
import Freight from "./Freight";
import { Item } from "./Item";
import User from "./User";

export default class Order {
  private itensList!: Item[]
  private couponDiscount: Coupon | null;

  constructor(readonly user: User, itensList: Item[], couponDiscount: Coupon | null = null, readonly to: string = "someplace", readonly from: string = "someplace") {
    this.setItensList(itensList);
    this.couponDiscount = couponDiscount;
  }

  private setItensList(itensList: Item[]) {
    for (const item of itensList) {
      const hasRepeat = itensList.filter(i => i.getIdProduct() === item.getIdProduct());
      if (hasRepeat.length > 1) throw new Error("Item can't be repeated");
    }
    this.itensList = itensList;
  }

  public totalAmount() {
    const fullValue = this.itensList.reduce((accumulator, atualItem) => accumulator + atualItem.getItemTotalAmount(), 0);
    const products = this.itensList.map(item => item.product)
    const freight = new Freight();
    const freightTax = freight.calcTotalTax(products, this.to, this.from);
    const discount = this.couponDiscount ? this.couponDiscount.calculateDiscountValue(fullValue) : 0;

    return (fullValue + freightTax) - discount;
  }
}
