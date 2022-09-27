/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import Navigator from './src/navigator';
import {name as appName} from './app.json';
import App from './src'

AppRegistry.registerComponent(appName, () => App);
