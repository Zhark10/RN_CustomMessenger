/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Alert} from 'react-native';
import {TLibraryInputData} from './src/global/types';
import {Messanger} from './src/MessangerStack';
import {AnswerType} from 'src/MessangerStack/types';

const StartChat = (libraryInputData: TLibraryInputData) => {
  const ViewForChat = (): React.ReactNode => {
    const [isShowedMessanger, toShowMessanger] = React.useState(false);
    const createdMessanger = <Messanger {...libraryInputData} />;

    React.useEffect(() => {
      toShowMessanger(true);
    }, []);

    React.useEffect(() => {}, [isShowedMessanger]);

    return isShowedMessanger ? createdMessanger : <></>;
  };

  ViewForChat();
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
          text: 'hi, man! How are you?',
        },
        actionAfterAnswer: () => Alert.alert('Answer sended'),
        myAnswerType: AnswerType.INPUT,
      },
      {
        botMessage: {
          text: 'hi, man! How are you?',
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

export const StartAConversation = StartChat(example);
