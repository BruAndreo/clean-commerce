import { UserDefinition } from "./UserDefinition";

export type NewOrder = {
  user: UserDefinition,
  itens: ProductItem[],
  coupon: string | null,
  to: string,
  from: string
};

export type ProductItem = {
  idProduct: number,
  quantity: number
};
