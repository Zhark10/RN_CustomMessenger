import {Alert} from 'react-native';
import {AnswerType} from '../src/MessangerStack/types';
import {OfflineMessanger} from '../App';
import {TLibraryInputData} from '../src/utils/types';

const example: TLibraryInputData = {
  messangerData: {
    backgroundColor: 'green',
    bubblesConfigForBot: {
      backgroundColor: 'red',
      textColor: 'white',
    },
    bubblesConfigForMe: {
      backgroundColor: 'blue',
      textColor: 'white',
    },
    messages: [
      {
        botMessage: {
          text: 'Hi, man! What`s your name?',
        },
        myAnswerType: AnswerType.TIMEPICKER,
        actionAfterAnswer: () => Alert.alert('Answer sended'),
      },
      {
        botMessage: {
          text: 'How are you?',
        },
        myAnswerType: AnswerType.INPUT,
        actionAfterAnswer: () => Alert.alert('Answer sended'),
      },
    ],
  },
  events: {
    startConversationEvent: () => Alert.alert('Chat started'),
    endConversationEvent: () => Alert.alert('Chat ended'),
  },
};

const StartAConversation = () => OfflineMessanger(example);

export default StartAConversation;
