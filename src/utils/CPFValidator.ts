function clear(cpf: string) {
  return cpf.replace(/\D||[A-Za-z]/g, "");
}

function isAllSameDigit(cpf: string) {
  return cpf.split("").every(digit => digit === cpf[0]);
}

function hasCorrectSize(cpf: string) {
  return cpf.length === 11;
}

function isZeroDigit(rest: number) {
  return rest < BASE_NUM_TO_ZERO_DIGIT;
}

function calcNormalDigit(rest: number) {
  return BASE_NUM_TO_NORMAL_DIGIT - rest
}

function getTwoLastDigits(cpf: string) {
  return cpf.substring(cpf.length - 2);
}

const BASE_DIV = 11;
const BASE_NUM_TO_ZERO_DIGIT = 2;
const BASE_NUM_TO_NORMAL_DIGIT = 11;
const FACTOR_TO_TENTH_DIGIT = 10;
const FACTOR_TO_ELEVENTH_DIGIT = 11;

function calcTotalValue (cpfDigits: string, factor: number) {
  let sumTotal = 0;
  for (const digit of cpfDigits) {
    if (factor > 1) {
      sumTotal += (Number.parseInt(digit) * factor);
      factor--;
    }
  }
  return sumTotal;
}

function getDigit(firstsDigits, factor) {
  const sumTotal = calcTotalValue(firstsDigits, factor);
  const rest = sumTotal % BASE_DIV;

  return isZeroDigit(rest) ? "0" : calcNormalDigit(rest).toString();
}

export function cpfValidate (cpf: string) {
  const cpfNumbers = clear(cpf);
  if (!hasCorrectSize(cpfNumbers)) return false;
  if (isAllSameDigit(cpfNumbers)) return false;

  const tenthDigit = getDigit(cpfNumbers, FACTOR_TO_TENTH_DIGIT);
  const eleventhDigit = getDigit(cpfNumbers, FACTOR_TO_ELEVENTH_DIGIT);
  const originalDigits = getTwoLastDigits(cpfNumbers)

  return originalDigits === (tenthDigit + eleventhDigit);
}
