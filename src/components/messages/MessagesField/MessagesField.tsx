import React, {FC, useContext} from 'react';
import {View, Text} from 'react-native';
import {TChatProps} from '../../../types';
import {MessagesFieldStyles} from './S_MessagesField';
import {ChatContext} from '../../../store/ChatProvider';

const MessagesField: FC<TChatProps> = React.memo(({chatMiddleware}) => {
  const {
    messageStack: [messages, refreshMessages],
  } = useContext(ChatContext)!;
  const [index, setIndex] = React.useState(0);

  const {setAnswerFieldVisible} = chatMiddleware;

  React.useEffect(() => {
    if (messages.length && messages[messages.length - 1].sender === 'me') {
      setAnswerFieldVisible(false);
      // TODO: adapting for other message types
      const wait = messages[messages.length - 1].text!.length * 50;
      const timer = setTimeout(() => setIndex(0), wait);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [messages, setAnswerFieldVisible]);

  return (
    <View style={MessagesFieldStyles.main}>
      <Text>{messages[0]}</Text>>
    </View>
  );
});

export default MessagesField;
