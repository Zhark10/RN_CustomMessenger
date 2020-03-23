import {AnswerType} from '../../types';

export const getAnswerSize = (
  type: AnswerType,
  numberOfButtons: number,
): number => {
  const heightforChoice =
    numberOfButtons === 1
      ? 80
      : numberOfButtons * 48 + (numberOfButtons + 1) * 16;

  const values = {
    [AnswerType.INPUT]: 80,
    [AnswerType.MULTICHOICE]: 200,
    [AnswerType.DATEPICKER]: 200,
    [AnswerType.CHOICE]: heightforChoice,
    [AnswerType.ONLY_BUTTON]: 144,
    [AnswerType.PHOTO]: 144,
  };
  return values[type];
};
