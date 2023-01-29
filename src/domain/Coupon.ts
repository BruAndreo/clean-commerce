export default class Coupon {

    static build(name: string, validate: Date, percentValue: number) {
        // validate is not past
        // percentValue is not less than 0

        return new Coupon(name, validate, percentValue);
    }

    private constructor(name: string, validate: Date, percentValue: number) {}
}