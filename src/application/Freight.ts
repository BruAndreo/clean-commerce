import Product from "./Product";

export default class Freight {
  public calcTotalTax(products: Product[], to: string, from: string): number {
    return products
      .map(product => this.calcFreihtTax(product, to, from))
      .reduce((accumulator, actualProduct) => accumulator += actualProduct, 0);
  }

  private calcFreihtTax(product: Product, to: string, from: string) {
    const volume = product.getVolume();
    const density = product.getDensity();
    const distancyValue = this.calcDistancyValue(to, from);

    const tax = distancyValue * volume * (density / 100);

    return this.isElegibleToMinTax(tax) ? 10 : parseFloat(tax.toFixed(2));
  }

  private calcDistancyValue(to: string, from: string): number {
    // TODO: NOT IMPLEMENTED
    return 1000;
  }

  private isElegibleToMinTax(tax: number): boolean {
    return 10 > tax;
  }
}
