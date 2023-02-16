import { orderList } from "../infra/database/OrderDatabase";
import OrderRepository from "./OrderRepository";

export default class OrderRepositoryJSON implements OrderRepository {
  getSequence(): number {
    return orderList.length;
  }
}
