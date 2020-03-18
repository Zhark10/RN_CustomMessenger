import {TOnlyOneMessageIteration} from 'src/MessangerStack/types';

export type TLibraryInputData = {
  messangerData: TMessangerData;
  navigation: TMessangerEvent;
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

export type TMessangerEvent = {
  startConversationCallback: () => void;
  endConversationCallback: () => void;
};
