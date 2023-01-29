import Coupon from "./Coupon";
import { Item } from "./Item";
import User from "./User";

export default class Order {


    constructor(readonly user: User, itensList: Item[], couponDiscount: Coupon | null = null) {
    }

}