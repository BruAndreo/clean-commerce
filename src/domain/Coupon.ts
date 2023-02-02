export default class Coupon {
  static build(name: string, validate: Date, percentValue: number) {
    // percentValue is not less than 0
    if (validate.getTime() < new Date().getTime()) throw new Error("Coupon is expired");

    return new Coupon(name, validate, percentValue);
  }

  private constructor(readonly name: string, readonly validate: Date, readonly percentValue: number) {}

  public calculateDiscountValue(totalAmount: number) {
      return parseInt(((totalAmount * this.percentValue) / 100).toFixed(2));
  }
}
