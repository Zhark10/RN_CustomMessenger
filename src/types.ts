import {TUseChatMiddleware} from './utils/hooks/USE_ChatMiddleware';
import {TLibraryInputData} from './types/types';
export type TOnlyOneMessageIteration = {
  botMessage: IMessage[];
  myAnswerType: AnswerType;
  actionAfterAnswer: () => void;
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
