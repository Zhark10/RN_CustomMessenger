import {TViewStyles} from '../../../types/T_LibraryInputData';

export type TDatePicker = {
  onSendDate: (date: string) => void;
  viewStyles: TViewStyles;
};
