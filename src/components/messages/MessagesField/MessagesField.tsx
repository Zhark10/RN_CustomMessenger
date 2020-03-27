import React, {FC, useContext} from 'react';
import {View, Text} from 'react-native';
import {TChatProps} from '../../../types';
import {MessagesFieldStyles} from './S_MessagesField';
import {ChatContext} from '../../../store/ChatProvider';
import {useRefreshMessageStack} from '../../../utils/hooks/USE_RefreshMessageStack';

const MessagesField: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData}) => {
    const {
      messageStack: [messages, refreshMessages],
    } = useContext(ChatContext)!;

    useRefreshMessageStack(chatMiddleware, refreshMessages);

    const {viewStyles} = libraryInputData;

    return (
      <View
        style={[
          MessagesFieldStyles.main,
          {backgroundColor: viewStyles.chatBackgroundColor},
        ]}>
        {messages.map(message => (
          <Text>{message.text}</Text>
        ))}
      </View>
    );
  },
);

export default MessagesField;
