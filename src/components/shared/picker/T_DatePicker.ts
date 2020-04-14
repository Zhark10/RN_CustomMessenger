import {TViewStyles} from '../../../types/T_LibraryInputData';

export type TDatePicker = {
  onSaveDate: (date: IDate) => void;
  viewStyles: TViewStyles;
  mode: 'creditCard' | 'bornDate';
};

export type IDate = {
  month: string;
  year: string;
  day?: string;
};
