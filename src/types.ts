import {TUseChatMiddleware} from './utils/hooks/USE_ChatMiddleware';
import {TLibraryInputData} from './types/T_LibraryInputData';
export type TOnlyOneMessageIteration = {
  keyForFormData: string;
  botMessage: IMessage[];
  myAnswer: IAnswer;
  actionAfterAnswer: (answerText: string) => void;
};

export enum EAnswerType {
  INPUT = 'INPUT',
  CHOICE = 'CHOICE',
  MULTICHOICE = 'MULTICHOICE',
  PHOTO = 'PHOTO',
  DATEPICKER = 'DATEPICKER',
}

export interface IMessage {
  text: string;
  picture?: string;
  emoji?: string;
}

export interface IInputAnswer {
  buttonIcon: string;
}

export interface IChoiceAnswer {
  buttonTitle: string;
  buttonFunc: (buttonTitle: string) => void;
}

export interface IMultichoiceAnswer {
  checkboxTitles: string[];
  buttonFunc: (selectedCheckboxes: string[]) => void;
}

export interface IInputPhoto {
  numbersOfPhoto: 'two' | 'one';
  buttonFunc: (photoBlobs: [string]) => void;
}

export interface IAnswer {
  myAnswerType: EAnswerType;
  INPUT?: IInputAnswer;
  CHOICE?: IChoiceAnswer[];
  MULTICHOICE?: IMultichoiceAnswer;
  PHOTO?: IInputPhoto;
  DATEPICKER?: IInputAnswer;
}

export interface TChatProps {
  libraryInputData: TLibraryInputData;
  chatMiddleware: TUseChatMiddleware;
}
