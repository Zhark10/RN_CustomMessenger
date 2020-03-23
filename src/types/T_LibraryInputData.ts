/* eslint-disable @typescript-eslint/no-unused-vars */
import {TOnlyOneMessageIteration} from '../types';

export type TLibraryInputData = {
  viewStyles: TViewStyles;
  animations?: TAnimations;
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

export type TAnimations = {
  bubbleShowAnimation: 'bottomToTop' | 'fromSide';
  bubbleShowAnimationSpeed: 'fast' | 'normal' | 'slow';
  answerFieldShowAnimation: 'withScale' | 'withoutScale';
  answerFieldShowAnimationSpeed: 'fast' | 'normal' | 'slow';
};

export type TOutputData = {[keyForFormData: string]: string};

export type TMessangerEvents = {
  startConversationEvent: () => void;
  endConversationEvent: (outputData: TOutputData) => void;
};
