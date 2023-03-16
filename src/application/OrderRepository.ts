export default interface OrderRepository {
  getSequence(): number | Promise<number>;
  save(order: saveOrder): void | Promise<void>;
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
