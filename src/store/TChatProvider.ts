export type TStore = {
  messageStack: TStateManager;
  currentMessage: TStateManager;
  chatInfo: TStateManager;
};

type TStateManager = (
  | React.Dispatch<React.SetStateAction<undefined>>
  | undefined)[];


