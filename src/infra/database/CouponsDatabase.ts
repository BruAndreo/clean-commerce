import { CouponsType } from "../../types/CouponType";

export const couponsList: CouponsType[] = [
  {
    description: "Cupom de 20% de desconto",
    code: "CUPOM20",
    expireDate: "2020-12-31T23:59:59",
    percentDiscount: 20
  },
  {
    description: "Cupom de 10% de desconto",
    code: "CUPOM10",
    expireDate: "2023-12-31T23:59:59",
    percentDiscount: 10
  }
];
