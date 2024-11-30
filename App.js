import React, { useEffect, useState, useRef } from 'react';
import { Linking, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/auth/splashScreen/index';
import Home from './src/screens/home/Home';
import Login from './src/screens/auth/login';
import Signup from './src/screens/auth/signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Search from './src/screens/home/Collections';
import Profile from './src/screens/home/Profile';
import { COLORS } from './constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from './src/Components/Pixel/Index';
import Editor from './src/screens/home/editor';

import { Provider, useSelector } from 'react-redux';
import store from './src/redux/store';
import ImageScreen from './src/screens/home/Home/image';
import TabStack from './src/screens/navigation/BottomNavigation';

const Stack = createStackNavigator();

function App() {

  const [initialScreen, setInitialScreen] = useState('SplashScreen');
  
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialScreen}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="TabStack" component={TabStack} options={{ headerShown: false }} />
            <Stack.Screen name="ImageScreen" component={ImageScreen} options={{ headerShown: false, cardStyle: { backgroundColor: 'transparent' }, presentation: 'transparentModal' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;