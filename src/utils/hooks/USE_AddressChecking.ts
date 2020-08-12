import {useState, useCallback, useEffect} from 'react';
import {TUseChatMiddleware, EBubbleType} from './USE_ChatMiddleware';
import SimpleToast from 'react-native-simple-toast';
import {getPlace} from '../apis/API_GMaps';

const useAddressChecking = (
  chatMiddleware: TUseChatMiddleware,
  setVisibleAdditionalAnswerPanel: any,
) => {
  const {
    title,
    endFunc,
    googleMapApiKey,
  } = chatMiddleware!.currentChatBotQuestion!.myAnswer!.ADDRESS!;
  const [country, saveCountry] = useState('');
  const [city, saveCity] = useState('');
  const [street, saveStreet] = useState('');
  const [house, saveHouse] = useState('');
  const [apartment, saveApartment] = useState('');
  const [postCode, savePostCode] = useState('');
  const [isNeedToFill, setNeedToFill] = useState(false);

  useEffect(function requiredFieldsValidation(){
    setNeedToFill(false);
  }, [country, city, street, house, postCode]);

  const onHidePanel = useCallback(() => {
    setVisibleAdditionalAnswerPanel(false);
  }, [setVisibleAdditionalAnswerPanel]);

  const getPlaceByFields = () => {
    (async () => {
      if (
        country.length > 0 &&
        city.length > 0 &&
        street.length > 0 &&
        house.length > 0 &&
        postCode.length > 0
      ) {
        const _apartment = apartment.length > 0 ? ', ' + apartment : '';
        const addresForChecking = `${country}, ${city}, ${street}, ${house}, ${postCode}`;
        const isFound = await getPlace(addresForChecking, googleMapApiKey);
        if (isFound) {
          onHidePanel();
          chatMiddleware.sendAnswer(
            addresForChecking + _apartment,
            EBubbleType.TEXT,
          );

          const _address: any = {
            street,
            house,
            postCode,
            city,
            country,
          };

          if (apartment.length > 0) {
            _address.apartment = apartment;
          }
          endFunc(_address);
        } else {
          setNeedToFill(true);
          SimpleToast.show('Адрес не найден');
        }
      } else {
        setNeedToFill(true);
      }
    })();
  };

  return {
    getPlaceByFields,
    states: {
      saveCountry,
      country,
      saveCity,
      city,
      saveStreet,
      street,
      saveHouse,
      house,
      savePostCode,
      postCode,
      saveApartment,
    },
    apartment,
    onHidePanel,
    title,
    isNeedToFill,
  };
};

export const USE_Address = {
  useAddressChecking,
};
