export type TOnlyOneMessageIteration = {
  myMessage: IMessage;
  botMessage: IMessage | IMessage[];
  type: ActionTypes;
  actionAfterAnswer: () => void;
};

export enum ActionTypes {
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
