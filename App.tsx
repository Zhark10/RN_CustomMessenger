import React from 'react';
import {TLibraryInputData} from './src/global/types';
import {Messanger} from './src/MessangerStack';
console.disableYellowBox = true;

export const StartChat = (libraryInputData: TLibraryInputData) => {
  const ViewForChat = (): React.ReactNode => {
    const createdMessanger = <Messanger {...libraryInputData} />;
    return createdMessanger;
  };
  return ViewForChat();
};
