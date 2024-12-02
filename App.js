import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/auth/splashScreen/index';
import Home from './src/screens/home/Home';
import Login from './src/screens/auth/login';
import Signup from './src/screens/auth/signup';
import Profile from './src/screens/home/Profile';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import ImageScreen from './src/screens/home/Home/image';
import TabStack from './src/screens/navigation/BottomNavigation';
import CollectionDetails from './src/screens/home/Collections/CollectionDetail';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'SplashScreen'}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="TabStack" component={TabStack} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="ImageScreen" component={ImageScreen} options={{ headerShown: false, cardStyle: { backgroundColor: 'transparent' }, presentation: 'transparentModal' }} />
            <Stack.Screen name="CollectionDetails" component={CollectionDetails} options={{ headerShown: false, cardStyle: { backgroundColor: 'transparent' }, presentation: 'transparentModal' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;