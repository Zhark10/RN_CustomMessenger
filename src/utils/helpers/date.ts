import {monthsShort} from 'moment';

export const YEARS = Array(100)
  .fill(0)
  .map((_: any, i: number) => i + 1910);

export const MONTHS = monthsShort();
export const MONTHS_NUMBERS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];
