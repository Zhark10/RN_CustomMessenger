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
};

export interface IMessage {
  text: string;
  picture?: string;
  emoji?: string;
}

export interface IInputAnswer {
  keyForFormData: string;
  buttonFunc: (inputText: string) => void;
}

export interface IChoiceAnswer {
  keyForFormData: string;
  checkboxTitles: string[];
  buttonFunc: (selectedValue: string) => void;
}

export interface IMultichoiceAnswer {
  keyForFormData: string;
  checkboxTitles: string[];
  buttonFunc: (selectedValues: string[]) => void;
}

export interface IInputPhoto {
  keyForFormData: string;
  numbersOfPhoto: 'two' | 'one';
  buttonFunc: (photos: any[]) => void;
}

export interface IAnswer {
  INPUT?: IInputAnswer;
  CHOICE?: IChoiceAnswer;
  MULTICHOICE?: IMultichoiceAnswer;
  PHOTO?: IInputPhoto;
  DATEPICKER?: IInputAnswer;
}

export interface TChatProps {
  libraryInputData: TLibraryInputData;
  chatMiddleware: TUseChatMiddleware;
}
