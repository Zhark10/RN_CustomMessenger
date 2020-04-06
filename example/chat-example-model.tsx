import React, {FC} from 'react';
import {Alert} from 'react-native';
import {OfflineMessanger} from '../App';
import {TLibraryInputData} from '../src/types/T_LibraryInputData';

const example: TLibraryInputData = {
  viewStyles: {
    headerBackgroundColor: 'green',
    headerTitleColor: '#fff',
    chatBackgroundColor: '#000',
    answerFieldColor: '#6b6b6b',
    buttonColor: 'yellow',
    bubblesConfigForBot: {
      backgroundColor: '#6b6b6b',
      textColor: 'white',
    },
    bubblesConfigForMe: {
      backgroundColor: 'rgba(235,235,235,.54)',
      textColor: 'white',
    },
  },
  messages: [
    {
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
      myAnswer: {
        INPUT: {
          keyForFormData: 'firstName',
          buttonFunc: () => {},
        },
      },
    },
    {
      botMessage: [
        {
          text: 'Nice! What`s your gender?',
        },
      ],
      myAnswer: {
        CHOICE: {
          keyForFormData: 'gender',
          checkboxTitles: ['male', 'female', 'other0', 'other1'],
          buttonFunc: () => {},
        },
      },
    },
    {
      botMessage: [
        {
          text: 'Please, select some values!',
        },
      ],
      myAnswer: {
        MULTICHOICE: {
          keyForFormData: 'selections',
          checkboxTitles: ['select_1', 'select_2', 'select_3', 'select_4'],
          buttonFunc: () => {},
        },
      },
    },
    {
      botMessage: [
        {
          text: 'I`m really nice to meet you, dude! Why would I give you that?',
        },
      ],
      myAnswer: {
        INPUT: {
          keyForFormData: 'some_text',
          buttonFunc: text => Alert.alert(text!),
        },
      },
    },
    {
      botMessage: [
        {
          text: 'Thanks! You born...',
        },
      ],
      myAnswer: {
        PHOTO: {
          keyForFormData: 'photo',
          numbersOfPhoto: 'two',
          startFunc: () => {},
          endFunc: (base64, photoType) => {
            Alert.alert(`${base64}:${photoType}`);
          },
        },
      },
    },
  ],
  events: {
    startConversationEvent: () => Alert.alert('Chat started'),
    endConversationEvent: () => Alert.alert('Chat ended'),
    answerSended: data => console.log('formData for token (example)', data),
  },
};

const StartAConversation: FC = () => <OfflineMessanger {...example} />;

export default StartAConversation;
