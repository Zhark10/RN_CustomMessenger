import {TOnlyOneMessageIteration} from './../MessangerStack/types';

export type TLibraryInputData = {
  viewStyles: TViewStyles;
  messages: TOnlyOneMessageIteration[];
  events: TMessangerEvents;
};

export type TViewStyles = {
  headerBackgroundColor: string;
  headerTitleColor: string;
  chatBackgroundColor: string;
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
