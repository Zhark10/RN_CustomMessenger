import React, {FC, useContext} from 'react';
import {View, ScrollView} from 'react-native';
import {TChatProps} from '../../../types';
import {MessagesFieldStyles} from './S_MessagesField';
import {ChatContext} from '../../../store/ChatProvider';
import {useRefreshMessageStack} from '../../../utils/hooks/USE_RefreshMessageStack';
import {Bubble} from '../Bubble/Bubble';

const MessagesField: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData}) => {
    const {
      messageStack: [messages, refreshMessages],
    } = useContext(ChatContext)!;

    const typing = useRefreshMessageStack(chatMiddleware, refreshMessages);

    const {viewStyles} = libraryInputData;

    return (
      <View style={MessagesFieldStyles.main}>
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
            {messages.map((message, key) => (
              <Bubble
                key={key}
                isLastMessage={messages.length - 1 === key}
                message={message}
                viewStyles={viewStyles}
              />
            ))}
            {typing ? <Bubble isTyping viewStyles={viewStyles} /> : <></>}
          </View>
        </ScrollView>
      </View>
    );
  },
);

export default MessagesField;
