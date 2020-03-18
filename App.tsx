/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Alert} from 'react-native';
import {TLibraryInputData} from './src/global/types';
import {Messanger} from './src/MessangerStack';
import {AnswerType} from './src/MessangerStack/types';
console.disableYellowBox = true;

const StartChat = (libraryInputData: TLibraryInputData) => {
  const ViewForChat = (): React.ReactNode => {
    const createdMessanger = <Messanger {...libraryInputData} />;
    return createdMessanger;
  };
  return ViewForChat();
};

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
