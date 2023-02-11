import { couponsList } from "../infra/database/CouponsDatabase";
import { CouponsType } from "../types/CouponType";
import Coupon from "./Coupon";
import CouponsRepository from "./CouponsRepository";

export default class CouponsRepositoryJSON implements CouponsRepository {
  getCouponByCode(code: string): Coupon | null {
    const [coupon] = couponsList.filter(coupon => coupon.code === code);
    return coupon ? new Coupon(coupon) : null;
  }

}
