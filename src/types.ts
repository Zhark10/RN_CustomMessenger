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
};

export interface IMessage {
  text: string;
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
  checkboxTitles: string[];
  buttonFunc: (selectedValue?: string) => void;
}

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

export interface IAnswer {
  INPUT?: IInputAnswer;
  CHOICE?: IChoiceAnswer;
  MULTICHOICE?: IMultichoiceAnswer;
  PHOTO?: IPhotoAnswer;
  DATEPICKER?: IInputAnswer;
  BUTTON?: IButtonAnswer;
  [key: string]: any;
}

export interface TChatProps {
  libraryInputData: TLibraryInputData;
  chatMiddleware: TUseChatMiddleware;
}
