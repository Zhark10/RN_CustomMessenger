import {TUseChatMiddleware} from './utils/hooks/USE_ChatMiddleware';
import {TLibraryInputData} from './types/T_LibraryInputData';
export type TOnlyOneMessageIteration = {
  keyForFormData: string;
  botMessage: IMessage[];
  myAnswerType: AnswerType;
  actionAfterAnswer: (answerText: string) => void;
};

export enum AnswerType {
  INPUT = 'INPUT',
  CHOICE = 'CHOICE',
  MULTICHOICE = 'MULTICHOICE',
  ONLY_BUTTON = 'ONLY_BUTTON',
  PHOTO = 'PHOTO',
  DATEPICKER = 'DATEPICKER',
}

export interface IMessage {
  text: string;
  picture?: string;
  emoji?: string;
}

export interface IAnswer {
  libraryInputData: TLibraryInputData;
  chatMiddleware: TUseChatMiddleware;
}
