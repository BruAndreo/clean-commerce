import { orderList } from "../infra/database/OrderDatabase";
import OrderRepository from "./OrderRepository";

export default class OrderRepositoryJSON implements OrderRepository {
  save(order: { code: string; cpf: string; location_to: string; location_from: string; coupon: number | null; itens: { idProduct: number; price: number; quantity: number; }[]; }): void | Promise<void> {
  }
  getSequence(): number {
    return orderList.length;
  }
}
