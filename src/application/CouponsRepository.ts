import Coupon from "./Coupon";

export default interface CouponsRepository {
  getCouponByCode(code: string): Coupon | null;
}
