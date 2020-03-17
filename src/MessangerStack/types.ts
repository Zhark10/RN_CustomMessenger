export type TOnlyOneMessageIteration = {
  myMessage: IMessage;
  botMessage: IMessage | IMessage[];
};

export interface IMessage {
  text: string;
  picture?: string;
  emoji?: string;
}
