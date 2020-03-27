export type TStore = {
  messageStack: TStateManager<TMessageAddedInStack[]>;
  currentMessage: TStateManager<TMessageIndexNumber>;
  chatInfo: TStateManager<TSavedOneIterationAnswer>;
};

type TStateManager<TDataForSave> = [
  TDataForSave,
  React.Dispatch<React.SetStateAction<TDataForSave>>
];

export type TMessageIndexNumber = number;
export type TSavedOneIterationAnswer = {[keyForFormData: string]: string};
export type TMessageAddedInStack = {
  id: number | string;
  sender: ISender;
  text?: string;
  picture?: string;
  emoji?: string;
};

export type ISender = 'me' | 'chatBot';
