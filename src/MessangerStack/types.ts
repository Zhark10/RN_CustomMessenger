export type TOnlyOneMessageIteration = {
  myMessage: IMessage;
  botMessage: IMessage | IMessage[];
  type: 'input' | 'choice' | 'button' | 'time-picker' | 'photo';
  actionAfterAnswer: () => void;
};

export interface IMessage {
  text: string;
  picture?: string;
  emoji?: string;
}
