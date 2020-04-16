import {TViewStyles} from './../../../types/T_LibraryInputData';

export type TPlaceInput = {
  type: 'Country' | string;
  viewStyles: TViewStyles;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
};
