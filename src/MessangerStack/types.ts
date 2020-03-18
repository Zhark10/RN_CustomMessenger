export type TOnlyOneMessageIteration = {
  botMessage: IMessage | IMessage[];
  myAnswerType: AnswerType;
  actionAfterAnswer: () => void;
};

export enum AnswerType {
  INPUT = 'INPUT',
  CHOICE = 'CHOICE',
  BUTTON = 'BUTTON',
  PHOTO = 'PHOTO',
  TIMEPICKER = 'TIMEPICKER',
}

export interface IMessage {
  text: string;
  picture?: string;
  emoji?: string;
}
