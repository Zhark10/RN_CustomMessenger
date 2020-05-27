import {TUseChatMiddleware} from './utils/hooks/USE_ChatMiddleware';
import {TLibraryInputData} from './types/T_LibraryInputData';
export type TOnlyOneMessageIteration = {
  botMessage: IMessage[];
  myAnswer: IAnswer;
};

export const EAnswerType = {
  INPUT: 'INPUT',
  CHOICE: 'CHOICE',
  MULTICHOICE: 'MULTICHOICE',
  PHOTO: 'PHOTO',
  DATEPICKER: 'DATEPICKER',
  BUTTON: 'BUTTON',
  PAYMENT: 'PAYMENT',
  ADDRESS: 'ADDRESS',
};

export interface IMessage {
  text?: string;
  picture?: string;
  emoji?: string;
}

export interface IInputAnswer {
  keyForFormData: string;
  buttonFunc: (inputText?: string) => void;
  sendAnswerOutput?: boolean;
}

export interface IChoiceAnswer {
  keyForFormData: string;
  checkboxTitles: TCheckboxData[];
  endFunc: (selectedValue: string) => void;
}

export type TCheckboxData = {
  key: string;
  checkboxTitle: string;
};

export interface IMultichoiceAnswer {
  keyForFormData: string;
  checkboxTitles: string[];
  buttonFunc: (selectedValues?: string[]) => void;
}

export interface IPhotoAnswer {
  keyForFormData: string;
  numbersOfPhoto: 'two' | 'one';
  startFunc: () => void;
  endFunc: (base64: string, photoType: IPhotoType) => void;
}

export type IPhotoType = 'face' | 'document-front' | 'document-back';

export interface IButtonAnswer {
  keyForFormData: string;
  title: string;
  buttonFunc: () => void;
}

export interface IPaymentCard {
  number: string | number;
  expirationMonth: string | number;
  expirationYear: string | number;
  cvc: string | number;
  name: string;
}

export interface IBankAccount {
  number_1: string | number;
  number_2: string | number;
}

interface IBornDate {
  month: string;
  year: string;
  day: string;
}

export interface IPaymentAnswer {
  keyForFormData: string;
  title: string;
  startFunc: () => void;
  endFuncForCreditCard: (data: IPaymentCard, cb: any) => void;
  endFuncForBankAccount: (data: IBankAccount, cb: any) => void;
}

export interface IAddressAnswer {
  keyForFormData: string;
  title: string;
  googleMapApiKey: string;
  endFunc: (address: any) => void;
}

export interface IDatepickerAnswer {
  keyForFormData: string;
  title: string;
  endFunc: (data: IBornDate) => void;
}

export interface IAnswer {
  INPUT?: IInputAnswer;
  CHOICE?: IChoiceAnswer;
  MULTICHOICE?: IMultichoiceAnswer;
  PHOTO?: IPhotoAnswer;
  DATEPICKER?: IDatepickerAnswer;
  BUTTON?: IButtonAnswer;
  PAYMENT?: IPaymentAnswer;
  ADDRESS?: IAddressAnswer;
  [key: string]: any;
}

export interface TChatProps {
  libraryInputData: TLibraryInputData;
  chatMiddleware: TUseChatMiddleware;
  setVisibleAdditionalAnswerPanel: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}
