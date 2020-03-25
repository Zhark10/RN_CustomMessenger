import {EAnswerType} from '../../types';

export const getAnswerSize = (
  type: string,
  numberOfCheckboxes: number,
): number => {
  const heightforChoice =
    numberOfCheckboxes === 1
      ? 80
      : numberOfCheckboxes * 36 + (numberOfCheckboxes + 1) * 16;

  const values = {
    [EAnswerType.INPUT]: 80,
    [EAnswerType.MULTICHOICE]: 200,
    [EAnswerType.DATEPICKER]: 200,
    [EAnswerType.CHOICE]: heightforChoice,
    [EAnswerType.PHOTO]: 144,
  };
  return values[type];
};
