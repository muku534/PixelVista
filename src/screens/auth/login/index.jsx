import { Button, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../../Components/Pixel/Index'
import { COLORS } from '../../../../constants'
import { SigninWithGoogle } from '../../../config/firebase/GoogleSignin'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess, loginWithGoogle } from '../../../redux/actions/loginAction'
import { fetchWallpapers } from '../../../redux/actions/wallpapersActions'
import { EmailSignin } from '../../../config/firebase/EmailSignin'

const Login = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userInfo);
    const loading = useSelector(state => state.user.loading);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleSignIn = async () => {
        dispatch(loginWithGoogle());
    };

    useEffect(() => {
        if (user) {
            dispatch(fetchWallpapers('mobile wallpaper', 1));
            Toast.show({
                type: 'success',
                text1: `Welcome Back ${user.displayName}`,
            });
            console.log(user.photoURL, user.displayName); // Corrected properties
            navigation.navigate('TabStack');
        }
    }, [user, dispatch, navigation]);


    const handleEmailSignin = async () => {
        try {
            await EmailSignin({ email, password });
            // dispatch(loginSuccess(userInfo));
            dispatch(fetchWallpapers('mobile wallpaper', 1))
            console.log('login succesfully')
            navigation.navigate('TabStack')
        } catch (error) {
            console.log('somthing went wrong', error)
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='position'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, marginVertical: hp(6) }}>
                    <View style={{ flex: 1, marginLeft: wp(5), marginRight: wp(5) }}>
                        <View>
                            <Text style={{ fontSize: hp(3.7), fontWeight: '700', color: 'black' }}>Hi Welcome Back ! 👋</Text>
                            <Text style={{ paddingVertical: hp(0.5), fontSize: hp(2.2), fontWeight: '300', color: 'black' }}>Hello again you have been missed!</Text>
                        </View>

                        <View style={{ marginVertical: hp(2), }}>
                            <View>
                                <Text style={{
                                    color: 'black',
                                    fontSize: hp(2.2),
                                    fontWeight: '400',
                                    marginTop: hp(2.2),
                                    marginBottom: hp(0.8),
                                }}>Email Address</Text>
                                <View style={{
                                    width: '100%',
                                    height: hp(6.3),
                                    borderColor: COLORS.black,
                                    borderWidth: 0.5,
                                    borderRadius: wp(2),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingLeft: wp(2),
                                }}>
                                    <TextInput
                                        placeholder='Enter your Email'
                                        placeholderTextColor={'gray'}
                                        keyboardType='email'
                                        style={{ width: '100%', color: 'black' }}
                                        value={email}
                                        onChangeText={text => setEmail(text)}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={{
                                    color: 'black',
                                    fontSize: hp(2.2),
                                    fontWeight: '400',
                                    marginTop: hp(2.2),
                                    marginBottom: hp(0.8),
                                }}>Password</Text>
                                <View style={{
                                    width: '100%',
                                    height: hp(6.3),
                                    borderColor: COLORS.black,
                                    borderWidth: 0.5,
                                    borderRadius: wp(2),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingLeft: wp(2),
                                }}>
                                    <TextInput
                                        placeholder='Enter your Password'
                                        placeholderTextColor={'gray'}
                                        keyboardType='visible-password'
                                        style={{ width: '100%', color: 'black' }}
                                        value={password}
                                        onChangeText={text => setPassword(text)}
                                    />
                                </View>
                            </View>

                            <View style={{ marginVertical: hp(3) }}>
                                <TouchableOpacity style={{ backgroundColor: 'lightblue', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={handleEmailSignin}>
                                    <Text style={{ fontSize: hp(2.4), paddingVertical: hp(1.5), color: COLORS.darkgray1, fontWeight: '600' }}>Login</Text>
                                </TouchableOpacity>
                            </View>
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

                        <View style={{ marginVertical: hp(5), justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

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
        marginTop: hp(3),
    },
    linkText: {
        fontSize: hp(2.2),
        color: 'black',

    },
    linkbutton: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    link: {
        color: '#037f51',
        fontSize: hp(2.2),
        fontWeight: 'bold',
    },
    lineText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(1),
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.darkgray1,
    },
    text: {
        width: wp(10),
        fontSize: hp(2.4),
        color: 'black',
        textAlign: 'center',
    },
})