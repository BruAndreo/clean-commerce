import { CouponsType } from "../types/CouponType";

export default class Coupon {
  private description: string;
  private code: string;
  private expireDate: Date;
  private percentDiscount!: number;

  public constructor(coupon: CouponsType) {
    this.description = coupon.description;
    this.code = coupon.code;
    this.expireDate = new Date(coupon.expireDate);
    this.setPercentDiscount(coupon.percentDiscount);
  }

  private isExpired() {
    return this.expireDate.getTime() < new Date().getTime();
  }

  private setPercentDiscount(value: number) {
    if (value <= 0) {
      this.percentDiscount = 0;
      throw new Error("Coupon discount not valid");
    }
    this.percentDiscount = value;
  }

  public calculateDiscountValue(totalAmount: number) {
    if (this.isExpired()) throw new Error("Coupon is expired");
    return parseInt(((totalAmount * this.percentDiscount) / 100).toFixed(2));
  }
}
