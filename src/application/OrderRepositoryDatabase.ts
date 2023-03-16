import Database from "../infra/database/Database";
import OrderRepository from "./OrderRepository";

export default class OrderRepositoryDatabase extends Database implements OrderRepository {
  async getSequence(): Promise<number> {
    const [{count}] = await this.query("SELECT COUNT(*) FROM orders");
    return parseInt(count);
  }

  async save(order: saveOrder): Promise<void> {
    console.log("REPOSITORY INPUT: ", order);

    await this.query(`INSERT INTO orders (code, cpf, location_to, location_from, id_coupon)
    VALUES ($1, $2, $3, $4, $5)`, [order.code, order.cpf, order.location_to, order.location_from, order.coupon]);

    //salvar itens
  }

}

type saveOrder = {
  code: string,
  cpf: string,
  location_to: string,
  location_from: string,
  coupon: number | null,
  itens: {
    idProduct: number,
    price: number,
    quantity: number
  }[]
};
