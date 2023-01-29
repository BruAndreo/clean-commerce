import Coupon from "../../src/domain/Coupon";
import { Item } from "../../src/domain/Item";
import Order from "../../src/domain/Orders";
import User from "../../src/domain/User";

test("Não deve realizar pedido com Usuario cujo CPF é invalido", () => {
    const order = () => new Order(new User("Bruno", "111.111.222-44"), [new Item(1)]);

    expect(order).toThrowError();
});

test("Deve fazer um pedido com 3 itens e calcular o valor total", () => {
    const order = new Order(new User("Bruno", "787.436.360-47"), [new Item(1), new Item(2), new Item(3)]);
    const totalAmount = order.totalAmount();

    expect(totalAmount).toBe(30);
});

test("Deve fazer um pedido com 3 itens e um cupon de desconto e calcular o valor total", () => {
    const user = new User("Bruno", "787.436.360-47");
    const itens = [new Item(1), new Item(2), new Item(3)];
    const couponDiscount = Coupon.build("Teste", new Date("2030-12-31"), 10);

    const order = new Order(user, itens, couponDiscount);
    const totalAmount = order.totalAmount();

    expect(totalAmount).toBe(27);
});
