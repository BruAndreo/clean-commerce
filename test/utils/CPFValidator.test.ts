import { cpfValidate } from "../../src/utils/CPFValidator";

test("Deve retornar sucesso quando o CPF for valido com pontuacao", () => {
    const cpfIsValid = cpfValidate("787.436.360-47");

    expect(cpfIsValid).toBeTruthy();
});

test("Deve retornar sucesso quando o CPF for valido sem pontuacao", () => {
    const cpfIsValid = cpfValidate("78743636047");

    expect(cpfIsValid).toBeTruthy();
});

test("Deve retornar sucesso quando o CPF for valido com segundo digito igual a zero", () => {
    const cpfIsValid = cpfValidate("111.365.120-20");

    expect(cpfIsValid).toBeTruthy();
});

test("Deve retornar sucesso quando o CPF for valido com primeiro digito igual a zero", () => {
    const cpfIsValid = cpfValidate("406.510.940-03");

    expect(cpfIsValid).toBeTruthy();
});

test("Deve retornar erro quando o CPF for invalido pelo algoritmo de validacao",  () => {
    const cpfIsValid = cpfValidate("111.222.333-44");

    expect(cpfIsValid).toBeFalsy();
});

test("Deve retornar erro quando o CPF tiver sempre os mesmos numeros",  () => {
    const cpfIsValid = cpfValidate("111.111.111-11");

    expect(cpfIsValid).toBeFalsy();
});

test("Deve retornar erro quando o CPF for invalido ter mais de 14 caracteres",  () => {
    const cpfIsValid = cpfValidate("787.436.360-475");

    expect(cpfIsValid).toBeFalsy();
});

test("Deve retornar erro quando o CPF for invalido ter menos de 11 caracteres",  () => {
    const cpfIsValid = cpfValidate("787.436.3");

    expect(cpfIsValid).toBeFalsy();
});

test("Deve retornar erro quando o CPF for vazio",  () => {
    const cpfIsValid = cpfValidate("");

    expect(cpfIsValid).toBeFalsy();
});
