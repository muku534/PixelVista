import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../../Components/Pixel/Index';
import { COLORS } from '../../../../constants';
import Home from '../../home/Home';
import WishList from '../../home/WishList';
import Editor from '../../home/editor';
import Search from '../../home/Collections';
import Collections from '../../home/Collections';

const Tab = createBottomTabNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: hp(1),
                    left: wp(4),
                    right: wp(4),
                    height: hp(7),
                    borderRadius: wp(5),
                    backgroundColor: COLORS.white, // Added white background
                    elevation: 5, // For Android shadow
                    shadowColor: '#000', // For iOS shadow
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3.5,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            iconName={focused ? 'home' : 'home-outline'}
                            label="Home"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Explore"
                component={Collections}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            iconName={focused ? 'view-grid' : 'view-grid-outline'}
                            label="Explore"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Wishlist"
                component={WishList}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            iconName={focused ? 'cards-heart' : 'cards-heart-outline'}
                            label="Wishlist"
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const TabIcon = ({ iconName, label, focused }) => {
    return (
        <View style={[styles.iconContainer, focused && styles.iconFocused]}>
            <MaterialCommunityIcons
                name={iconName}
                size={hp(4)}
                color={focused ? COLORS.secondaryWhite : COLORS.darkgray}
            />
        </View>
    );
};

export default TabStack;

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(15),
        height: hp(6),
        borderRadius: wp(6),
    },
    iconFocused: {
        backgroundColor: '#4A46E9', // Background color for focused icon
    },
});
