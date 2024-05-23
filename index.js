/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { initializeApp } from '@react-native-firebase/app'

// Your Firebase config (from the Firebase console)
const firebaseConfig = {
    apiKey: 'AIzaSyAPKBcE11Vg-ilYzZKwKZ0hwgwdHmj42eA',
    authDomain: 'pixelvista-ec9d7.firebaseapp.com',
    projectId: 'pixelvista-ec9d7',
    storageBucket: 'pixelvista-ec9d7.appspot.com',
    messagingSenderId: '634709718614',
    appId: '1:634709718614:android:52e2ab7710acb0e777adf7',
};

// Initialize Firebase
initializeApp(firebaseConfig);


AppRegistry.registerComponent(appName, () => App);
