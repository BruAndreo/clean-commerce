import { validate } from "../../src/utils/CPFValidator";

test("Deve retornar sucesso quando o CPF for valido com pontuacao", () => {
    const cpfIsValid = validate("787.436.360-47");

    expect(cpfIsValid).toBeTruthy();
});

test("Deve retornar sucesso quando o CPF for valido sem pontuacao", () => {
    const cpfIsValid = validate("78743636047");

    expect(cpfIsValid).toBeTruthy();
});

test("Deve retornar sucesso quando o CPF for valido com segundo digito igual a zero", () => {
    const cpfIsValid = validate("111.365.120-20");

    expect(cpfIsValid).toBeTruthy();
});

test("Deve retornar sucesso quando o CPF for valido com primeiro digito igual a zero", () => {
    const cpfIsValid = validate("406.510.940-03");

    expect(cpfIsValid).toBeTruthy();
});

test("Deve retornar erro quando o CPF for invalido pelo algoritmo de validacao",  () => {
    const cpfIsValid = validate("111.222.333-44");

    expect(cpfIsValid).toBeFalsy();
});

test("Deve retornar erro quando o CPF tiver sempre os mesmos numeros",  () => {
    const cpfIsValid = validate("111.111.111-11");

    expect(cpfIsValid).toBeFalsy();
});

test("Deve retornar erro quando o CPF for invalido ter mais de 14 caracteres",  () => {
    const cpfIsValid = validate("787.436.360-475");

    expect(cpfIsValid).toBeFalsy();
});

test("Deve retornar erro quando o CPF for invalido ter menos de 11 caracteres",  () => {
    const cpfIsValid = validate("787.436.3");

    expect(cpfIsValid).toBeFalsy();
});

test("Deve retornar erro quando o CPF for vazio",  () => {
    const cpfIsValid = validate("");

    expect(cpfIsValid).toBeFalsy();
});
