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
import Search from './src/screens/home/Search';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  // const userData = useSelector(state => state.user_data);
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          width: '100%',
          height: hp(7),
          backgroundColor: '#fff',
          // borderColor: '#000',
          // borderWidth: 0,
        },
      }}
    >
      <Tab.Screen name="HomeScreen" component={Home} options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, color, size }) => (
          <View style={{ alignItems: 'center' }}>
            {focused ? <MaterialCommunityIcons name="home" size={hp(4)} color={COLORS.darkgray} /> : <MaterialCommunityIcons name="home-outline" size={hp(4)} color={color} />}
            {focused && <Text style={{ color: COLORS.black, fontWeight: '700', fontSize: hp(1.8) }}>Home</Text>}
          </View>
        ),
      }} />
      <Tab.Screen name="Search" component={Search} options={{
        headerShown: false,
        tabBarLabel: 'Search',
        tabBarIcon: ({ focused, color, size }) => (
          <View style={{ alignItems: 'center' }}>
            {focused ? <MaterialIcons name="search" size={hp(4.2)} color={COLORS.darkgray} /> : <MaterialIcons name="search" size={hp(4.2)} color={color} />}
            {focused && <Text style={{ color: COLORS.black, fontWeight: '700', fontSize: hp(1.8) }}>Search</Text>}
          </View>
        ),
      }} />
      <Tab.Screen name="Editor" component={Editor} options={{
        headerShown: false,
        tabBarLabel: 'Editor',
        tabBarIcon: ({ focused, color, size }) => (
          <View style={{ alignItems: 'center' }}>
            {focused ? <MaterialIcons name="mode-edit" size={hp(4)} color={COLORS.darkgray} /> : <MaterialIcons name="mode-edit-outline" size={hp(4)} color={color} />}
            {focused && <Text style={{ color: COLORS.black, fontWeight: '700', fontSize: hp(1.8) }}>Design</Text>}
          </View>
        ),
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused, color, size }) => (
          <View style={{ alignItems: 'center' }}>
            {focused ? <MaterialCommunityIcons name="account" size={hp(4)} color={COLORS.darkgray} /> : <MaterialCommunityIcons name="account-outline" size={hp(4)} color={color} />}
            {focused && <Text style={{ color: COLORS.black, fontWeight: '700', fontSize: hp(1.8) }}>Profile</Text>}
          </View>
        ),
      }} />
    </Tab.Navigator>
  );
};

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