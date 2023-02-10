import Coupon from "../../src/application/Coupon";
import { Item } from "../../src/application/Item";
import Order from "../../src/application/Orders";
import User from "../../src/application/User";

beforeEach(() => {
  jest.clearAllMocks();
});

test("Não deve realizar pedido com Usuario cujo CPF é invalido", () => {
  const order = () => new Order(new User("Bruno", "111.111.222-44"), [new Item(1)]);

  expect(order).toThrowError();
});

test("Deve fazer um pedido com 3 itens e calcular o valor total", () => {
  const order = new Order(new User("Bruno", "787.436.360-47"), [new Item(1), new Item(2), new Item(3)]);
  const totalAmount = order.totalAmount();

  expect(totalAmount).toBe(166.70);
});

test("Deve fazer um pedido com 3 itens e um cupon de desconto e calcular o valor total", () => {
  const user = new User("Bruno", "787.436.360-47");
  const itens = [new Item(1), new Item(2), new Item(3)];
  const couponDiscount = Coupon.build("Teste", new Date("2030-12-31"), 10);

  const order = new Order(user, itens, couponDiscount);
  const totalAmount = order.totalAmount();

  expect(totalAmount).toBe(154.70);
});

test("Deve fazer um pedido e passar informações de retirada(to) e destino(from)", () => {
  const user = new User("Bruno", "787.436.360-47");
  const itens = [new Item(1), new Item(2), new Item(3)];
  const couponDiscount = Coupon.build("Teste", new Date("2030-12-31"), 10);
  const to = "someplace";
  const from = "someplace";

  const order = new Order(user, itens, couponDiscount, to, from);
  const totalAmount = order.totalAmount();

  expect(totalAmount).toBe(154.70);
});

test("Nao deve fazer um pedido de item com quantidade negativa", () => {
  const order = () => new Order(new User("Bruno", "787.436.360-47"), [new Item(1, -1)]);

  expect(order).toThrowError();
});

test("Nao deve fazer um pedido com itens iguais", () => {
  const itens = [new Item(1), new Item(1)]
  const order = () => new Order(new User("Bruno", "787.436.360-47"), itens);

  expect(order).toThrowError();
});

test("Nao deve criar um pedido com cupom de desconto expirado", () => {
  const user = new User("Bruno", "787.436.360-47");
  const itens = [new Item(1), new Item(2), new Item(3)];

  const order = () => {
    const couponDiscount = Coupon.build("Teste", new Date("2022-12-31"), 10);
    return new Order(user, itens, couponDiscount);
  }

  expect(order).toThrowError();
});

test("Nao deve calcular o valor de um pedido com o cupom expirado", () => {
  const user = new User("Bruno", "787.436.360-47");
  const itens = [new Item(1), new Item(2), new Item(3)];
  const couponDiscount = Coupon.build("Teste", new Date("2023-12-31"), 10);

  jest.useFakeTimers().setSystemTime(new Date("2024-01-05"));

  const order = () => {
    const order = new Order(user, itens, couponDiscount);
    return order.totalAmount();
  }

  expect(order).toThrowError();
});
