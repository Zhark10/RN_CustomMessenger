import React, {FC, useContext} from 'react';
import {View, Text} from 'react-native';
import {TChatProps} from '../../../types';
import {MessagesFieldStyles} from './S_MessagesField';
import {ChatContext} from '../../../store/ChatProvider';

const MessagesField: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData}) => {
    const {
      messageStack: [messages, refreshMessages],
    } = useContext(ChatContext)!;
    const [index, setIndex] = React.useState(0);
    const {viewStyles} = libraryInputData;
    const {
      setAnswerFieldVisible,
      currentChatBotQuestion: {botMessage},
    } = chatMiddleware;

    React.useEffect(() => {
      if (index < botMessage.length) {
        refreshMessages(currentStack => [
          ...currentStack,
          {
            id: botMessage[index].text,
            sender: 'chatBot',
            text: botMessage[index].text,
          },
        ]);
        const timeToShowNextMessage = setTimeout(() => {
          setIndex(currentIndex => currentIndex + 1);
        }, 2000);
        return () => clearTimeout(timeToShowNextMessage);
      } else {
        setAnswerFieldVisible(true);
      }
    }, [botMessage, index, refreshMessages, setAnswerFieldVisible]);

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
