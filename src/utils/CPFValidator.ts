function removePontuation(cpf: string) {
  return cpf.replace('.','').replace('.','').replace('-','').trim();
}

function isAllSameDigit(cpf: string) {
  return cpf.split("").every(digit => digit === cpf[0]);
}

function hasCorrectSize(cpf: string) {
  return cpf.length >= 11 && cpf.length <= 14;
}

function isZeroDigit(rest: number) {
  return rest < BASE_NUM_TO_ZERO_DIGIT;
}

function calcNormalDigit(rest: number) {
  return BASE_NUM_TO_NORMAL_DIGIT - rest
}

const BASE_DIV = 11;
const BASE_NUM_TO_ZERO_DIGIT = 2;
const BASE_NUM_TO_NORMAL_DIGIT = 11;

function calcTotalValue (cpfFirstsDigits) {
  let baseMult = 2;
  let sumTotal = 0;

  const cpfCopy = structuredClone(cpfFirstsDigits);

  cpfCopy.reverse().forEach(digit => {
    sumTotal += (Number.parseInt(digit) * baseMult);
    baseMult++;
  });

  return sumTotal;
}

function getOneMoreDigit(firstsDigits) {
  const sumTotal = calcTotalValue(firstsDigits);
  const rest = sumTotal % BASE_DIV;

  return isZeroDigit(rest) ? "0" : calcNormalDigit(rest).toString();
}

export function cpfValidate (cpf: string) {
  if (!hasCorrectSize(cpf)) return false;
  const cpfNumbers = removePontuation(cpf);
  if (isAllSameDigit(cpfNumbers)) return false;

  const cpfLength = cpfNumbers.length;

  const originalDigits = cpfNumbers.substring(cpfLength - 2);
  const cpfFirstsDigits = cpfNumbers.slice(0, 9).split("");

  const tenthDigit = getOneMoreDigit(cpfFirstsDigits);
  cpfFirstsDigits.push(tenthDigit);

  const eleventhDigit = getOneMoreDigit(cpfFirstsDigits);

  return originalDigits === (tenthDigit + eleventhDigit);
}
