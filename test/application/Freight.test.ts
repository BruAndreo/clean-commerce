import Freight from "../../src/application/Freight";
import Product from "../../src/application/Product";

test("Deve calcular o frete de um produto", () => {
  const product = new Product({
    idProduct: 3,
    name: "Caixa Veja Desengordurante",
    description: "Caixa com 10 Desengordutantes veja com fragancia de limao",
    price: 100,
    height: 23.7,
    width: 38.2,
    depth: 42.3,
    weight: 2.670
  });
  const freight = new Freight();
  const value = freight.calcTotalTax([product], 'someplace', 'someplace');

  expect(value).toBe(26.70);
});

test("Deve calcular o frete de um produto e se o valor for inferior ao minimo, retornar o valor minimo", () => {
  const product = new Product({
    idProduct: 2,
    name: "Harpic",
    description: "Harpic para limpeza completa de sua privada",
    price: 10,
    height: 23,
    width: 10,
    depth: 3,
    weight: 0.350
  });
  const freight = new Freight();
  const value = freight.calcTotalTax([product], 'someplace', 'someplace');

  expect(value).toBe(10);
});

test.todo("Deve calcular o frete de um produto com mais de uma quantidade");
