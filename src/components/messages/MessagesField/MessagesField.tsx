/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, ScrollView} from 'react-native';
import {TChatProps} from '../../../types';
import {MessagesFieldStyles} from './S_MessagesField';
import {useRefreshMessageStack} from '../../../utils/hooks/USE_RefreshMessageStack';
import {Bubble} from '../Bubble/Bubble';

interface IProps extends TChatProps {
  answerSize: number;
}

const MessagesField: FC<IProps> = React.memo(
  ({chatMiddleware, libraryInputData, answerSize}) => {
    const {messages, typing} = useRefreshMessageStack(chatMiddleware);

    const {viewStyles} = libraryInputData;

    return (
      <View style={[MessagesFieldStyles.main, {height: answerSize}]}>
        <ScrollView
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            MessagesFieldStyles.scrollViewContainer,
            {
              backgroundColor: viewStyles.chatBackgroundColor,
            },
          ]}
          style={MessagesFieldStyles.scrollView}>
          <View
            style={[
              MessagesFieldStyles.messageField,
              {backgroundColor: viewStyles.chatBackgroundColor},
            ]}>
            <View style={{zIndex: 2}}>
              {messages.map((message, key) => (
                <Bubble key={key} message={message} viewStyles={viewStyles} />
              ))}
            </View>
            <View style={{zIndex: 1}}>
              {typing ? <Bubble viewStyles={viewStyles} /> : <></>}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  },
);

export default MessagesField;
