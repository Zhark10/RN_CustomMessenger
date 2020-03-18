import {AppRegistry} from 'react-native';
import {StartChat} from './App';
import StartAConversation from './example/chat-example-model';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => StartAConversation);

export {StartChat};
