import React, {FC} from 'react';
import {Alert} from 'react-native';
import {OfflineMessanger} from '../App';
import {TLibraryInputData} from '../src/types/T_LibraryInputData';
import PROVIDERS from './auth-providers-data';

const {
  google: {googleMapApiKey},
} = PROVIDERS;

const example: TLibraryInputData = {
  chatHeaderComponent: <></>, // empty header for example
  viewStyles: {
    headerBackgroundColor: '#fff',
    headerTitleColor: '#fff',
    chatBackgroundColor: '#fff',
    answerFieldColor: '#fff',
    buttonColor: 'rgba(0,0,0,.54)',
    bubblesConfigForBot: {
      backgroundColor: '#F0F0F0',
      textColor: '#4F4E4E',
    },
    bubblesConfigForMe: {
      backgroundColor: 'rgba(0,0,0,.54)',
      textColor: '#fff',
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
          checkboxTitles: [
            {
              key: 'MALE',
              checkboxTitle: 'MALE',
            },
            {
              key: 'FEMALE',
              checkboxTitle: 'FEMALE',
            },
          ],
          endFunc: selected => {
            console.log(selected);
          },
        },
      },
    },
    {
      botMessage: [{text: 'What`s your address'}],
      myAnswer: {
        ADDRESS: {
          keyForFormData: 'address',
          title: 'ОК',
          endFunc: address => {
            console.log(address);
          },
          googleMapApiKey,
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
          numbersOfPhoto: 'one',
          startFunc: () => {},
          endFunc: (base64, photoType) => {
            Alert.alert(`${base64}:${photoType}`);
          },
        },
      },
    },
    {
      botMessage: [
        {
          text: 'When were you born?',
        },
      ],
      myAnswer: {
        DATEPICKER: {
          keyForFormData: 'bornDate',
          title: 'OK',
          endFunc: date => {
            console.log('bornDate: ', date);
          },
        },
      },
    },
    {
      botMessage: [
        {
          text: 'Please select pay method',
        },
      ],
      myAnswer: {
        PAYMENT: {
          keyForFormData: 'cardData',
          title: 'OK',
          endFuncForBankAccount: (data, _cb) => {
            console.log(data);
          },
          endFuncForCreditCard: (data, _cb) => {
            console.log(data);
          },
          startFunc: () => {},
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
