import {EAnswerType} from '../../types';

export const getAnswerSize = (
  type: string,
  numberOfButtons: number,
): number => {
  const heightforChoice =
    numberOfButtons === 1
      ? 80
      : numberOfButtons * 48 + (numberOfButtons + 1) * 16;

  const values = {
    [EAnswerType.INPUT]: 80,
    [EAnswerType.MULTICHOICE]: 200,
    [EAnswerType.DATEPICKER]: 200,
    [EAnswerType.CHOICE]: heightforChoice,
    [EAnswerType.PHOTO]: 144,
  };
  return values[type];
};
