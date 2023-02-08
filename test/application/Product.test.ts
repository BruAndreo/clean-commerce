import Product from "../../src/application/Product";
import { ProductDefinition } from "../../src/types/ProductDefinition";

const productBase: ProductDefinition =  {
  idProduct: 3,
  name: "Veja Desengordurante",
  description: "Desengordutante veja com fragancia de limao",
  price: 10,
  height: 18,
  width: 10,
  depth: 5,
  weight: 0.500
};


test.each([
  [ 'largura', 'Width', { ...productBase, width: -1 } ],
  [ 'largura', 'Width', { ...productBase, width: 0 } ],
  [ 'altura', 'Height', { ...productBase, height: -1 } ],
  [ 'altura', 'Height', { ...productBase, height: 0 } ],
  [ 'peso', 'Weight', { ...productBase, weight: -1 } ],
  [ 'peso', 'Weight', { ...productBase, weight: 0 } ],
  [ 'profundidade', 'Depth', { ...productBase, depth: -1 } ],
  [ 'profundidade', 'Depth', { ...productBase, depth: 0 } ]
])("Não deve criar a instancia de um produto com dimensoes negativas ou zeradas: %p", (dimensionName, field, product) => {
  const operation = () => new Product(product);
  expect(operation).toThrow(`${field} can't be equal or less than zero`);
});
