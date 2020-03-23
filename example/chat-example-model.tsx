/* eslint-disable react/react-in-jsx-scope */
import React, {FC} from 'react';
import {Alert} from 'react-native';
import {AnswerType} from '../src/types';
import {OfflineMessanger} from '../App';
import {TLibraryInputData} from '../src/types/T_LibraryInputData';

const example: TLibraryInputData = {
  viewStyles: {
    headerBackgroundColor: 'green',
    headerTitleColor: 'black',
    chatBackgroundColor: 'white',
    bubblesConfigForBot: {
      backgroundColor: 'red',
      textColor: 'white',
    },
    bubblesConfigForMe: {
      backgroundColor: 'blue',
      textColor: 'white',
    },
  },
  messages: [
    {
      keyForFormData: 'name',
      botMessage: [
        {
          text: 'Hi, man!',
        },
        {
          text: 'You got into my application!',
        },
        {
          text: 'What`s your name? (nickname)',
        },
      ],
      myAnswerType: AnswerType.INPUT,
      actionAfterAnswer: () => Alert.alert('Answer sended'),
    },
    {
      keyForFormData: 'gender',
      botMessage: [
        {
          text: 'Nice! What`s your gender?',
        },
      ],
      myAnswerType: AnswerType.MULTICHOICE,
      actionAfterAnswer: () => Alert.alert('Answer sended'),
    },
    {
      keyForFormData: 'some_text',
      botMessage: [
        {
          text: 'I`m really nice to meet you, dude! Why would I give you that?',
        },
      ],
      myAnswerType: AnswerType.INPUT,
      actionAfterAnswer: () => Alert.alert('Answer sended'),
    },
    {
      keyForFormData: 'date',
      botMessage: [
        {
          text: 'Thanks! You born...',
        },
      ],
      myAnswerType: AnswerType.DATEPICKER,
      actionAfterAnswer: () => Alert.alert('Answer sended'),
    },
  ],
  events: {
    startConversationEvent: () => Alert.alert('Chat started'),
    endConversationEvent: () => Alert.alert('Chat ended'),
  },
};

const StartAConversation: FC = () => <OfflineMessanger {...example} />;

export default StartAConversation;
