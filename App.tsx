/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View} from 'react-native';
import {TLibraryInputData} from 'src/global/types';
import {Messanger} from 'src/MessangerStack';

export const StartAConversation: FC<TLibraryInputData> = libraryInputData => {
  const createdMessanger = <Messanger {...libraryInputData} />;

  const [isShowedMessanger, toShowMessanger] = React.useState(false);

  React.useEffect(() => {
    toShowMessanger(true);
  }, []);

  React.useEffect(() => {
    
  }, [isShowedMessanger]);

  return isShowedMessanger ? createdMessanger;
};
