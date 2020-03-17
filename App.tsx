/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Alert} from 'react-native';

declare var global: {HermesInternal: null | {}};

const App = () => {
  React.useEffect(() => {
    Alert.alert('App started');
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'green',
      }}
    />
  );
};

export default App;
