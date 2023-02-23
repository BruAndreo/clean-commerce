import OrderRepositoryJSON from "../../../src/application/OrderRepositoryJSON";
import Checkout from "../../../src/application/useCases/checkout";
import { NewOrder } from "../../../src/types/NewOrder";

test("Nao deve criar um pedido com CPF invalido", async () => {
  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "111.111.222-44" },
    itens: [
      { idProduct: 1, quantity: 1 }
    ],
    coupon: "CUPOM20",
    to: "someplace",
    from: "someplace",
  };


  const result = async () => {
    const checkout = new Checkout();
    await checkout.createOrder(orderRaw);
  }

  await expect(result).rejects.toThrowError();
});

test("Nao deve criar um pedido com produtos repetidos", async () => {
  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "787.436.360-47" },
    itens: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 1, quantity: 1 },
    ],
    coupon: "CUPOM20",
    to: "someplace",
    from: "someplace",
  };

  const result = async () => {
    const checkout = new Checkout();
    await checkout.createOrder(orderRaw);
  }

  await expect(result).rejects.toThrow(new Error("Product can't be repeated"));
});

test("Deve gerar um codigo de pedido", async () => {
  jest.spyOn(OrderRepositoryJSON.prototype, "getSequence").mockReturnValue(0);

  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "787.436.360-47" },
    itens: [
      { idProduct: 1, quantity: 1 }
    ],
    coupon: null,
    to: "someplace",
    from: "someplace",
  };
  const checkout = new Checkout();
  const order = await checkout.createOrder(orderRaw);

  const year = new Date().getFullYear();
  expect(order.code).toBe(`${year}00000001`);
});

test("Deve fazer um pedido com 3 itens e calcular o valor total", async () => {
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

  const checkout = new Checkout();
  const order = await checkout.createOrder(orderRaw);

  expect(order.totalAmount).toBe(120.00);
});

test("Nao deve fazer um pedido de item com quantidade negativa", async () => {
  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "787.436.360-47" },
    itens: [
      { idProduct: 1, quantity: -1 }
    ],
    coupon: null,
    to: "someplace",
    from: "someplace",
  };

  const result = async () => {
    const checkout = new Checkout();
    await checkout.createOrder(orderRaw);
  }

  await expect(result).rejects.toThrow(new Error("Quantity is not valid"));;
});

test("Deve criar um pedido com cupom de desconto e calcular o valor de desconto", async () => {
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

  const checkout = new Checkout();
  const order = await checkout.createOrder(orderRaw);

  expect(order.totalAmount).toBe(120.00);
  expect(order.discount).toBe(12.00);
  expect(order.freight).toBe(46.70);
  expect(order.total).toBe(154.70);
});

test("Deve criar um pedido com cupom de desconto expirado mas nao calcular o desconto", async () => {
  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "787.436.360-47" },
    itens: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 1 }
    ],
    coupon: "CUPOM20",
    to: "someplace",
    from: "someplace",
  };

  const checkout = new Checkout();
  const order = await checkout.createOrder(orderRaw);

  expect(order.totalAmount).toBe(120.00);
  expect(order.discount).toBe(0);
  expect(order.freight).toBe(46.70)
  expect(order.total).toBe(166.70);
});

test("Deve criar um pedido e calcular o valor de frete", async () => {
  const orderRaw: NewOrder = {
    user: { name: "Bruno", cpf: "787.436.360-47" },
    itens: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 1 }
    ],
    coupon: "CUPOM20",
    to: "someplace",
    from: "someplace",
  };

  const checkout = new Checkout();
  const order = await checkout.createOrder(orderRaw);

  expect(order.totalAmount).toBe(120.00);
  expect(order.discount).toBe(0);
  expect(order.freight).toBe(46.70);
  expect(order.total).toBe(166.70);
});

// test.skip("Deve criar um pedido e inserir no banco de dados", async () => {
//   const checkout = new Checkout();
//   const getOrder = new GetOrder();
//   const orderRaw: NewOrder = {
//     user: { name: "Bruno", cpf: "787.436.360-47" },
//     itens: [
//       { idProduct: 1, quantity: 1 }
//     ],
//     coupon: "CUPOM20",
//     to: "someplace",
//     from: "someplace",
//   };

//   await checkout.createOrder(orderRaw);
//   const order = await getOrder.byId(checkout.idOrder);

//   expect(order).toBeTruthy();
// });

test.todo("Nao deve inserir um pedido com erro no banco de dados");
