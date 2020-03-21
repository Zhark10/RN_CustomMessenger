export type TStore = {
  messageStack: TStateManager<TMessageAddedInStack[]>;
  currentMessage: TStateManager<TMessageIndexNumber>;
  chatInfo: TStateManager<TSavedOneIterationAnswer[]>;
};

type TStateManager<T> = (React.Dispatch<React.SetStateAction<T>>)[];

export type TMessageIndexNumber = number;
export type TSavedOneIterationAnswer = number | string;
export type TMessageAddedInStack = {
  id: number;
  sender: 'me' | 'chatBot';
  text?: string;
  picture?: string;
  emoji?: string;
};
