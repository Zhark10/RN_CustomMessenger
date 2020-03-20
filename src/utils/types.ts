import {TOnlyOneMessageIteration} from 'src/MessangerStack/types';

export type TLibraryInputData = {
  messangerData: TMessangerData;
  events: TMessangerEvents;
};

export type TMessangerData = {
  messages: TOnlyOneMessageIteration[];
  backgroundColor: string;
  bubblesConfigForMe: {
    textColor: string;
    backgroundColor: string;
  };
  bubblesConfigForBot: {
    textColor: string;
    backgroundColor: string;
  };
};

export type TMessangerEvents = {
  startConversationEvent: () => void;
  endConversationEvent: () => void;
};
