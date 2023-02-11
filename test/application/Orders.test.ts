import Orders from "../../src/application/Orders";
import { NewOrder } from "../../src/types/NewOrder";

beforeEach(() => {
  jest.clearAllMocks();
});

test("Deve fazer um pedido com 3 itens e calcular o valor total", () => {
  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "787.436.360-47" },
    itens: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 1 }
    ],
    coupon: null,
    to: "someplace",
    from: "someplace",
  };

  const order = new Orders();
  order.create(orderRaw);
  const totalAmount = order.totalAmount();

  expect(totalAmount).toBe(166.70);
});

test("Não deve realizar pedido com Usuario cujo CPF é invalido", () => {
  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "111.111.222-44" },
    itens: [
      { idProduct: 1, quantity: 1 }
    ],
    coupon: null,
    to: "someplace",
    from: "someplace",
  };

  const order = new Orders();
  const orderResult = () => order.create(orderRaw);

  expect(orderResult).toThrowError();
});

test("Deve fazer um pedido com 3 itens e um cupon de desconto e calcular o valor total", () => {
  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "787.436.360-47" },
    itens: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 1 }
    ],
    coupon: "CUPOM10",
    to: "someplace",
    from: "someplace",
  };

  const order = new Orders();
  order.create(orderRaw);
  const totalAmount = order.totalAmount();

  expect(totalAmount).toBe(154.70);
});

test("Nao deve fazer um pedido de item com quantidade negativa", () => {
  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "787.436.360-47" },
    itens: [
      { idProduct: 1, quantity: -1 }
    ],
    coupon: null,
    to: "someplace",
    from: "someplace",
  };

  const order = new Orders();
  const orderResult = () => order.create(orderRaw);

  expect(orderResult).toThrowError();
});

test("Nao deve fazer um pedido com itens iguais", () => {
  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "787.436.360-47" },
    itens: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 1, quantity: 1 }
    ],
    coupon: null,
    to: "someplace",
    from: "someplace",
  };

  const order = new Orders();
  const orderResult = () => order.create(orderRaw);

  expect(orderResult).toThrowError();
});

test("Nao deve criar um pedido com cupom de desconto expirado", () => {
  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "787.436.360-47" },
    itens: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 1, quantity: 1 }
    ],
    coupon: "CUPOM20",
    to: "someplace",
    from: "someplace",
  };

  const order = new Orders();
  const orderResult = () => order.create(orderRaw);

  expect(orderResult).toThrowError();
});

test("Nao deve calcular o valor de um pedido com o cupom expirado", () => {
  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "787.436.360-47" },
    itens: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 1, quantity: 1 }
    ],
    coupon: "CUPOM20",
    to: "someplace",
    from: "someplace",
  };

  const order = new Orders();
  jest.useFakeTimers().setSystemTime(new Date("2024-01-05"));
  const orderResult = () => {
    order.create(orderRaw);
    return order.totalAmount();
  };

  expect(orderResult).toThrowError();
});
