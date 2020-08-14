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
          text: 'Привет! Меня зовут Аркадий! Я фронтенд-разработчик! Удели, пожалуйста, немного времени!',
        },
        {
          text: 'Возможно, я разработал этот модуль именно для твоего проекта!',
        },
        {
          text: 'Он позволит тебе заблаговременно запросить у пользователя определенную информацию',
        },
        {
          text:
            'Какую именно, ты определяешь сам, но она может быть полезна, например, при регистрации, опроснике и т.д.',
        },
        {
          text:
            'Я уже использовал данную библиотеку в двух коммерческих проектах',
        },
        {
          text: 'Итак, как тебя зовут?',
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
          text: 'Хорошее имя! Кстати, сейчас идет демонстрация функционала библиотеки :)',
        },
        {
          text: 'На следующем шаге нужно указать свой пол',
        },
      ],
      myAnswer: {
        CHOICE: {
          keyForFormData: 'gender',
          checkboxTitles: [
            {
              key: 'MALE',
              checkboxTitle: 'Мужской',
            },
            {
              key: 'FEMALE',
              checkboxTitle: 'Женский',
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
          text: 'Какой эмоцией можешь описать себя?',
        },
      ],
      myAnswer: {
        MULTICHOICE: {
          keyForFormData: 'selections',
          checkboxTitles: ['Улыбка 😀', 'Смех 😂', 'УГ 😒'],
          buttonFunc: () => {},
        },
      },
    },
    {
      botMessage: [
        {
          text: 'Понял! А теперь сделай селфи, будь добр(-а)! Это фото увидишь только ты, можешь не волноваться :)',
        },
      ],
      myAnswer: {
        PHOTO: {
          keyForFormData: 'photo',
          numbersOfPhoto: 'one',
          startFunc: () => {},
          endFunc: (base64, photoType) => {
            console.log(`Фото типа "${photoType}": ${base64.slice(0,50)}`)
          },
        },
      },
    },
    {
      botMessage: [
        {
          text: 'Кстати, а когда ты родился(-ась)?',
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
          text: 'Сейчас будет форма с дополнительной страницей для формирования данных по карте или счету клиента',
        },
        {
          text: 'Это может быть так же полезно для твоих задач! Пока просто можешь ввести любые данные',
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
          text: 'Вот и все! В твоем console.log() уже появилась конечная модель со всеми ответами по ключам!',
        },
      ],
    },
  ],
  events: {
    startConversationEvent: () => Alert.alert('Chat started'),
    endConversationEvent: outputData =>
      console.log('А вот и сформированная модель:', JSON.stringify(outputData, null, 2)),
    answerSended: data => console.log('formData for token (example)', data),
  },
}

const StartAConversation: FC = () => <OfflineMessanger {...example} />

export default StartAConversation
