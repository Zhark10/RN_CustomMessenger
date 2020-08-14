import { EAnswerType, IAnswer } from '../../types'

export const getAnswerSize = (myAnswer: IAnswer): number => {
  const myAnswerType = Object.getOwnPropertyNames(myAnswer)[0]
  const isChoice = myAnswerType === EAnswerType.CHOICE
  const isMultichoice = myAnswerType === EAnswerType.MULTICHOICE

  const numberOfCheckboxes = isChoice
    ? myAnswer.CHOICE!.checkboxTitles!.length
    : isMultichoice
    ? myAnswer.MULTICHOICE!.checkboxTitles!.length
    : 0

  const heightforChoice = numberOfCheckboxes === 1 ? 80 : numberOfCheckboxes * 40 + (numberOfCheckboxes + 1) * 20

  const heightforMultichoice = numberOfCheckboxes === 1 ? 80 : numberOfCheckboxes * 40 + (numberOfCheckboxes + 1) * 20

  const values = {
    [EAnswerType.INPUT]: 80,
    [EAnswerType.DATEPICKER]: 212,
    [EAnswerType.MULTICHOICE]: heightforMultichoice,
    [EAnswerType.CHOICE]: heightforChoice,
    [EAnswerType.PHOTO]: 78,
    [EAnswerType.BUTTON]: 78,
    [EAnswerType.PAYMENT]: 78,
    [EAnswerType.ADDRESS]: 78,
  }
  return values[myAnswerType]
}
