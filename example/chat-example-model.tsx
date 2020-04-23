import React, {FC} from 'react';
import {Alert} from 'react-native';
import {OfflineMessanger} from '../App';
import {TLibraryInputData} from '../src/types/T_LibraryInputData';

const example: TLibraryInputData = {
  viewStyles: {
    headerBackgroundColor: 'green',
    headerTitleColor: '#fff',
    chatBackgroundColor: '#fff',
    answerFieldColor: '#6b6b6b',
    buttonColor: '#fff',
    bubblesConfigForBot: {
      backgroundColor: '#6b6b6b',
      textColor: '#fff',
    },
    bubblesConfigForMe: {
      backgroundColor: 'rgba(0,0,0,.24)',
      textColor: 'rgba(0,0,0,.87)',
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
          checkboxTitles: ['MALE', 'FEMALE'],
          buttonFunc: () => {},
        },
      },
    },
    {
      botMessage: [
        {
          text: 'How is your mood?',
        },
      ],
      myAnswer: {
        MULTICHOICE: {
          keyForFormData: 'selections',
          checkboxTitles: ['smile 😀', 'laugh 😂', 'sad 😒'],
          buttonFunc: () => {},
        },
      },
    },
    {
      botMessage: [
        {
          text: 'Thanks! Take a picture please!',
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
