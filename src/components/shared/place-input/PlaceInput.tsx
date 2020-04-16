import * as React from 'react';
import {TPlaceInput} from './T_PlaceInput';
import {google} from '../../../../../../utils/config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {screenHeight} from '../../../utils/helpers/screen';

export const PlaceInput: React.FC<TPlaceInput> = ({
  setAddress,
  viewStyles: {buttonColor},
  error,
  setError,
}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={'Address'}
      minLength={1}
      autoFocus={false}
      returnKeyType={'search'}
      keyboardAppearance={'light'}
      listViewDisplayed="auto"
      fetchDetails={true}
      renderDescription={(row: {description: any}) => row.description}
      onPress={(data: any, details = null) => {
        setError(false);
        setAddress(data.description);
      }}
      getDefaultValue={() => ''}
      query={{
        //todo added new param for google api key
        key: 'API_KEY',
        language: 'de',
        // types: '(cities)',
      }}
      enablePoweredByContainer={false}
      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        description: {
          fontFamily: 'Circe-Regular',
          fontSize: 14,
          color: '#797979',
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: '#5d5d5d',
          fontFamily: 'Circe-Regular',
          fontSize: 16,
          borderBottomWidth: 1,
          borderBottomColor: error ? 'red' : buttonColor,
        },
        listView: {
          paddingHorizontal: 8,
          maxHeight: screenHeight / 3,
          shadowOpacity: 0.25,
          shadowRadius: 4,
          shadowColor: '#fefefe',
          shadowOffset: {height: 0, width: 0},
          margin: 3,
          top: -3,
          elevation: 3,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        },
        separator: {
          width: '93%',
          paddingHorizontal: 16,
          alignSelf: 'center',
        },
      }}
      // currentLocation={true}
      // currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch"
      GooglePlacesDetailsQuery={{
        fields: 'formatted_address',
      }}
      filterReverseGeocodingByTypes={[
        'locality',
        'administrative_area_level_3',
      ]}
      // predefinedPlaces={[homePlace, workPlace]}

      debounce={200}
    />
  );
};
