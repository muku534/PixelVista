import { Button, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../../Components/Pixel/Index'
import { COLORS } from '../../../../constants'
import { SigninWithGoogle } from '../../../config/firebase/GoogleSignin'
import Toast from 'react-native-toast-message'

const Login = ({ navigation }) => {

    const handleGoogleSignIn = async () => {
        const userInfo = await SigninWithGoogle();
        if (userInfo) {
            // Handle successful login, e.g., navigate to another screen
            Toast.show({
                type: 'success',
                Text1: `Welcome Back ${userInfo.displayname}`
            })
            navigation.navigate('TabStack');
        } else {
            // Handle sign-in failure, e.g., show an error message
            Toast.show({
                type: 'error',
                Text1: `Somthing went wrong please try again`
            })
            console.log("Google Sign-In failed.");
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, marginVertical: 40 }}>
                    <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
                        <View>
                            <Text style={{ fontSize: 23, fontWeight: '700', color: 'black' }}>Hi Welcome Back ! 👋</Text>
                            <Text style={{ paddingVertical: 8, fontSize: 16, fontWeight: '300', color: 'black' }}>Hello again you have been missed!</Text>
                        </View>

                        <View style={{ marginVertical: 10, }}>
                            <View>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 16,
                                    fontWeight: '400',
                                    marginTop: 16,
                                    marginBottom: 5,
                                }}>Email Address</Text>
                                <View style={{
                                    width: '100%',
                                    height: 48,
                                    borderColor: 'black',
                                    borderWidth: 0.5,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingLeft: 10,
                                }}>
                                    <TextInput
                                        placeholder='Enter your Email'
                                        placeholderTextColor={'gray'}
                                        keyboardType='email'
                                        style={{ width: '100%', color: 'black' }}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 16,
                                    fontWeight: '400',
                                    marginTop: 16,
                                    marginBottom: 5,
                                }}>Password</Text>
                                <View style={{
                                    width: '100%',
                                    height: 48,
                                    borderColor: 'black',
                                    borderWidth: 0.5,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingLeft: 10,
                                }}>
                                    <TextInput
                                        placeholder='Enter your Password'
                                        placeholderTextColor={'gray'}
                                        keyboardType='visible-password'
                                        style={{ width: '100%', color: 'black' }}
                                    />
                                </View>
                            </View>

                            <View style={{ marginVertical: 20 }}></View>
                            <TouchableOpacity style={{ backgroundColor: 'lightblue', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate("TabStack")}>
                                <Text style={{ fontSize: 18, paddingVertical: 7, color: 'black', fontWeight: '600' }}>Login</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.lineText}>
                            <View style={styles.line} />
                            <Text style={styles.text}>or</Text>
                            <View style={styles.line} />
                        </View>
                        <View style={styles.linkContainer}>
                            <Text style={styles.linkText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.linkbutton}>
                                <Text style={styles.link}>Signup</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginVertical: hp(3), justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

                            <TouchableOpacity style={{ marginHorizontal: wp(3), paddingHorizontal: wp(4), flexDirection: 'row', borderRadius: wp(2), borderWidth: hp(0.2), borderColor: COLORS.gray, padding: hp(0.5), alignItems: 'center' }} onPress={() => handleGoogleSignIn()}>
                                <Image source={require("../../../../assets/images/google.png")} style={{ height: hp(5), width: wp(10) }} />
                                <Text style={{ fontSize: hp(2.2), paddingHorizontal: wp(2), color: COLORS.darkgray1 }}>Google</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginHorizontal: wp(3), paddingHorizontal: wp(4), flexDirection: 'row', borderRadius: wp(2), borderWidth: hp(0.2), borderColor: COLORS.gray, padding: hp(0.5), alignItems: 'center' }}>
                                <Image source={require("../../../../assets/images/facebook.png")} style={{ height: hp(5), width: wp(10) }} />
                                <Text style={{ fontSize: hp(2.2), paddingHorizontal: wp(2), color: COLORS.darkgray1 }}>Facebook</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    linkText: {
        fontSize: 16,
        color: 'black',

    },
    linkbutton: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    link: {
        color: '#037f51',
        fontSize: 16,
        fontWeight: 'bold',
    },
    lineText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
    },
    text: {
        width: 30,
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
})