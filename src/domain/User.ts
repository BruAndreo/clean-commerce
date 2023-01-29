import { cpfValidate } from "../utils/CPFValidator";

export default class User {
    constructor(readonly name: string, readonly cpf: string) {
        this.isValidCPF();
    }

    private isValidCPF() {
        const valid = cpfValidate(this.cpf);

        if (!valid) throw new Error("CPF is not valid");
    }
}