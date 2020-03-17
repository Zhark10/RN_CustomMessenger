/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View} from 'react-native';
import {TLibraryInputData} from 'src/global/types';
import {screenHeight, screenWidth} from 'src/global/screen';

export const Messanger: FC<TLibraryInputData> = libraryInputData => {
  return (
    <View
      style={{
        position: 'absolute',
        height: screenHeight,
        width: screenWidth,
        backgroundColor: '#FFF',
      }}
    />
  );
};
