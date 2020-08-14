import { TOnlyOneMessageIteration } from '../types'

export type TLibraryInputData = {
  chatHeaderComponent: React.ReactNode
  viewStyles: TViewStyles
  animations?: TAnimations
  messages: TOnlyOneMessageIteration[]
  events: TMessangerEvents
}

export type TViewStyles = {
  headerBackgroundColor: string
  headerTitleColor: string
  chatBackgroundColor: string
  answerFieldColor: string
  buttonColor: string
  bubblesConfigForMe: {
    textColor: string
    backgroundColor: string
  }
  bubblesConfigForBot: {
    textColor: string
    backgroundColor: string
  }
}

export type TAnimations = {
  bubbleShowAnimation: 'bottomToTop' | 'fromSide'
  bubbleShowAnimationSpeed: 'fast' | 'normal' | 'slow'
  answerFieldShowAnimation: 'withScale' | 'withoutScale'
  answerFieldShowAnimationSpeed: 'fast' | 'normal' | 'slow'
}

export type TOutputData = { [keyForFormData: string]: string }

export type TMessangerEvents = {
  startConversationEvent: () => void
  endConversationEvent: (outputData: TOutputData) => void
  answerSended: (outputData: TOutputData) => void
}
