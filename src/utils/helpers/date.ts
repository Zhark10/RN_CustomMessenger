import moment, {monthsShort} from 'moment';

const currentYear = moment().year();
export const YEARS_FOR_BORN_DATE = Array(100)
  .fill(0)
  .map((_: any, i: number) => i + (currentYear - 84));
export const YEARS_FOR_CREDIT_CARD = Array(130)
  .fill(0)
  .map((_: any, i: number) => i + (currentYear - 110));

export const MONTHS = monthsShort();

function zeroFill(num: string | number, size: number) {
  let s = num + '';
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
}

export const MONTHS_NUMBERS = [...Array(12)].map((_, i) => zeroFill(i + 1, 2));

export const getDays = (number: number) =>
  [...Array(number)].map((_, i) => zeroFill(i + 1, 2));
