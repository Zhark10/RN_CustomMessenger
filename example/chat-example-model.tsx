import {Alert} from 'react-native';
import {AnswerType} from '../src/MessangerStack/types';
import {StartChat} from '../App';
import {TLibraryInputData} from '../src/global/types';

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
        actionAfterAnswer: () => Alert.alert('Answer sended'),
        myAnswerType: AnswerType.TIMEPICKER,
      },
      {
        botMessage: {
          text: 'How are you?',
        },
        actionAfterAnswer: () => Alert.alert('Answer sended'),
        myAnswerType: AnswerType.INPUT,
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
