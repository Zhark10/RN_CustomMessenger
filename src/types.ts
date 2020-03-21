export type TOnlyOneMessageIteration = {
  botMessage: IMessage | IMessage[];
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
