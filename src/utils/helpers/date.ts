import {monthsShort} from 'moment';

export const YEARS = Array(111)
  .fill(0)
  .map((_: any, i: number) => i + 1910);

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
