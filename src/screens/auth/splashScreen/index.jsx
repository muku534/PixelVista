import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {

    // Uncomment this line to navigate to "Login" screen after 1000ms
    setTimeout(() => {
        navigation.navigate("Login")
    }, 1000);

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../../../assets/images/Animation.json')}
                autoPlay
                loop
                onAnimationLoad={() => console.log("Animation loaded successfully")}
                onAnimationError={(error) => {
                    console.log("Animation failed to load");
                    console.log("Error:", error);
                }}
                style={styles.animation}
            />
            <Text style={styles.text}>hello</Text>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: '100%',
        height: '100%',
    },
    text: {
        color: 'black',
        position: 'absolute',
        bottom: 20,
    },
});
