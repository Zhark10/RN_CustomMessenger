import React, { FC } from 'react'
import { Alert, View, Image, Text } from 'react-native'
import { OfflineMessanger } from '../App'
import { TLibraryInputData } from '../src/types/T_LibraryInputData'
import PROVIDERS from './auth-providers-data'

const {
  google: { googleMapApiKey },
} = PROVIDERS

const example: TLibraryInputData = {
  chatHeaderComponent: (
    <View
      style={{
        height: 64,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -12,
        },
        shadowOpacity: 0.12,
        shadowRadius: 8.0,
        elevation: 8,
      }}
    >
      <Image style={{ height: 64, width: 64 }} source={require('./profile-pic.png')} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: 'rgba(0,0,0,.87)',
          paddingRight: 16,
        }}
      >
        https://github.com/Zhark10
      </Text>
    </View>
  ),
  viewStyles: {
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
          text: 'Hello! My name is Arkady. I need a moment of your time.',
        },
        {
          text: 'I might have developed a module which fits your project best :)',
        },
        {
          text: 'It will help you to request some information from a user beforehand.',
        },
        {
          text:
            'You can choose what information to ask yourself, for example, you can query a user during the registration, questionnaire, etc.',
        },
        {
          text:
            'I have already used this library in a couple of commercial projects.',
        },
        {
          text: 'So what is your name?',
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
          text: 'Nice! By the way, now you see the demo of the library :)',
        },
        {
          text: 'In the next step you need to indicate gender',
        },
      ],
      myAnswer: {
        CHOICE: {
          keyForFormData: 'gender',
          checkboxTitles: [
            {
              key: 'MALE',
              checkboxTitle: 'Male',
            },
            {
              key: 'FEMALE',
              checkboxTitle: 'Female',
            },
          ],
          endFunc: selected => {
            console.log(selected)
          },
        },
      },
    },
    // it doesn't work because of a fake google api key (just enter your key:))

    // {
    //   botMessage: [{text: 'What`s your address'}],
    //   myAnswer: {
    //     ADDRESS: {
    //       keyForFormData: 'address',
    //       title: 'ОК',
    //       endFunc: address => {
    //         console.log(address);
    //       },
    //       googleMapApiKey,
    //     },
    //   },
    // },
    {
      botMessage: [
        {
          text: 'What emotion describes you best?',
        },
      ],
      myAnswer: {
        MULTICHOICE: {
          keyForFormData: 'selections',
          checkboxTitles: ['Smile 😀', 'Laugh 😂', 'Sad 😒'],
          buttonFunc: () => {},
        },
      },
    },
    {
      botMessage: [
        {
          text: 'I see. Now, please, make a selfie! This photo will be seen only by you, don’t worry :)',
        },
      ],
      myAnswer: {
        PHOTO: {
          keyForFormData: 'photo',
          numbersOfPhoto: 'one',
          startFunc: () => {},
          endFunc: (base64, photoType) => {
            console.log(`Photo by type "${photoType}": ${base64.slice(0,50)}`)
          },
        },
      },
    },
    {
      botMessage: [
        {
          text: 'By the way, when were you born?',
        },
      ],
      myAnswer: {
        DATEPICKER: {
          keyForFormData: 'bornDate',
          title: 'OK',
          endFunc: date => {
            console.log('bornDate: ', date)
          },
        },
      },
    },
    {
      botMessage: [
        {
          text: 'Now you will see the form with the page for data generation on the customer’s card or bill.',
        },
        {
          text: 'It also can be necessary for your tasks! Now you can just fill it in with random data',
        },
      ],
      myAnswer: {
        PAYMENT: {
          keyForFormData: 'cardData',
          title: 'OK',
          endFuncForBankAccount: (data, _cb) => {
            console.log(data)
          },
          endFuncForCreditCard: (data, _cb) => {
            console.log(data)
          },
          startFunc: () => {},
        },
      },
    },
    {
      botMessage: [
        {
          text: 'That’s it! There is the final model with all key answers in your console.log()',
        },
      ],
    },
  ],
  events: {
    startConversationEvent: () => Alert.alert('Chat started'),
    endConversationEvent: outputData =>
      console.log('Output model:', JSON.stringify(outputData, null, 2)),
    answerSended: data => console.log('formData for token (example)', data),
  },
}

const StartAConversation: FC = () => <OfflineMessanger {...example} />

export default StartAConversation
