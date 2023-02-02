import Coupon from "./Coupon";
import { Item } from "./Item";
import User from "./User";

export default class Order {
  private itensList!: Item[]
  private couponDiscount: Coupon | null;

  constructor(readonly user: User, itensList: Item[], couponDiscount: Coupon | null = null) {
    this.setItensList(itensList);
    this.couponDiscount = couponDiscount;
  }

  private setItensList(itensList: Item[]) {
    for (const item of itensList) {
      const hasRepeat = itensList.filter(i => i.getIdItem() === item.getIdItem());
      if (hasRepeat.length > 1) throw new Error("Item can't be repeated");
    }
    this.itensList = itensList;
  }

  public totalAmount() {
    const fullValue = this.itensList.reduce((accumulator, atualItem) => accumulator + atualItem.getItemTotalAmount(), 0);
    let discount = 0;

    if (this.couponDiscount) {
      discount = this.couponDiscount.calculateDiscountValue(fullValue);
    }

    return fullValue - discount;
  }
}
