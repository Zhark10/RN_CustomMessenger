import {Alert} from 'react-native';
import {AnswerType} from '../src/MessangerStack/types';
import {StartChat} from '../App';
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
  navigation: {
    startConversationCallback: () => Alert.alert('Chat started'),
    endConversationCallback: () => Alert.alert('Chat ended'),
  },
};

const StartAConversation = () => StartChat(example);

export default StartAConversation;
