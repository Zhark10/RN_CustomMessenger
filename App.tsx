import React from 'react';
import {TLibraryInputData} from './src/utils/types';
import {MessangerStack} from './src/MessangerStack';
console.disableYellowBox = true;

export const StartChat = (libraryInputData: TLibraryInputData) => {
  const ViewForChat = (): React.ReactNode => {
    const createdMessanger = <MessangerStack {...libraryInputData} />;
    return createdMessanger;
  };
  return ViewForChat();
};
