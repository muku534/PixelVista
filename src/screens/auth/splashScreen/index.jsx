import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallpapers } from '../../../redux/actions/wallpapersActions';
import auth from '@react-native-firebase/auth';
import { loginSuccess } from '../../../redux/actions/loginAction';

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            const currentUser = auth().currentUser;
            if (currentUser) {
                // If a user is signed in, dispatch login success and navigate to 'TabStack'
                const userInfo = {
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                };
                dispatch(loginSuccess(userInfo));
                dispatch(fetchWallpapers('mobile wallpaper',1));
                navigation.replace('TabStack');
            } else {
                // If no user is signed in, navigate to 'Login'
                navigation.replace('Login');
            }
        }, 3500);

        return () => clearTimeout(timer); // This will clear the timeout if the component is unmounted before the time ends
    }, [dispatch, navigation]);

    return (
        // <View style={styles.container}>
        <LottieView
            source={require('../../../../assets/images/Animation - 1716629222620.json')}
            autoPlay
            loop={true}
            style={{ width: '100%', height: '100%' }}
        />
        // <Text style={styles.text}>hello</Text>
        // </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // animation: {
    //     width: '100%',
    //     height: '100%',
    // },
    text: {
        color: 'black',
        position: 'absolute',
        bottom: 20,
    },
});
