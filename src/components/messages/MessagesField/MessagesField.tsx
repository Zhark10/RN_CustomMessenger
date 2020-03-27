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

    useRefreshMessageStack(chatMiddleware, refreshMessages);

    const {viewStyles} = libraryInputData;

    return (
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
            MessagesFieldStyles.main,
            {backgroundColor: viewStyles.chatBackgroundColor},
          ]}>
          {messages.map(message => (
            <Bubble key={message.text} message={message} />
          ))}
        </View>
      </ScrollView>
    );
  },
);

export default MessagesField;
