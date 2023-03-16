import Coupon from "../Coupon";
import Freight from "../Freight";
import { Item } from "../Item";
import Product from "../Product";

export default class Order {
  private code!: string;
  public itens: Item[] = [];
  private coupon!: Coupon | null;
  // private freight: Freight;

  constructor(productItemList: productItem[], sequenceOrder: number) {
    this.setItens(productItemList);
    this.setCode(sequenceOrder.toString());
  }

  private setItens(itensList: productItem[]) {
    for (const item of itensList) {
      this.itens.push(new Item(item.product, item.quantity));
    }
  }

  private setCode(sequenceOrder: string) {
    const year = new Date().getFullYear();
    const sequenceBase = "00000000";
    const zeroSequence = sequenceBase.substring(0, sequenceBase.length - sequenceOrder.length);
    this.code = `${year}${zeroSequence}${sequenceOrder}`;
  }

  public setCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  public getCouponId() {
    return this.coupon ? this.coupon.getId() : null
  }

  public getCode() { return this.code; }

  public getProducts() {
    return this.itens.map(item => item.product);
  }

  public totalAmount() {
    return this.itens.reduce((accumulator, atualItem) => accumulator + atualItem.getItemTotalAmount(), 0);
  }

  public getDiscount() {
    if (!this.coupon) return 0;
    return this.coupon.calculateDiscountValue(this.totalAmount())
  }

  public total() {
    return this.totalAmount() - this.getDiscount();
  }

}

type productItem = {
  product: Product,
  quantity: number
}
