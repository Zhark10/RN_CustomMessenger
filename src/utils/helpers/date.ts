import moment, {monthsShort} from 'moment';

const currentYear = moment().year();
const currentMonth = moment().month();
export const YEARS_FOR_BORN_DATE = Array(100)
  .fill(0)
  .map((_: any, i: number) => i + (currentYear - 113));
export const YEARS_FOR_CREDIT_CARD = Array(20)
  .fill(0)
  .map((_: any, i: number) => i + currentYear);

export const MONTHS = monthsShort();
const MONTHS_FOR_CREDIT_CARD = monthsShort().slice(
  currentMonth + 2,
  MONTHS.length,
);
export const getMonthsByYearForCreditCard = (year: string) => {
  return +year === currentYear ? MONTHS_FOR_CREDIT_CARD : MONTHS;
};

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
