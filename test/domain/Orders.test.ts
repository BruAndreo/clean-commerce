import { Item } from "../../src/domain/Item";
import Order from "../../src/domain/Orders";
import User from "../../src/domain/User";

test("Não deve realizar pedido com Usuario cujo CPF é invalido", () => {

    const order = () => new Order(new User("Bruno", "111.111.222-44"), [new Item(1)]);

    expect(order).toThrowError();
});
