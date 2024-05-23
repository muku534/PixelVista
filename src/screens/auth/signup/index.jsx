import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const Signup = ({ navigation }) => {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, marginVertical: 30 }}>
                    <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
                        <View>
                            <Text style={{ fontSize: 23, fontWeight: '700', color: 'black' }}>Welcome! 👋</Text>
                            <Text style={{ paddingVertical: 8, fontSize: 16, fontWeight: '300', color: 'black' }}>We're glad you're here. Sign up to get started!</Text>
                        </View>

                        <View style={{ marginVertical: 10, }}>
                            <View>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 16,
                                    fontWeight: '400',
                                    marginTop: 16,
                                    marginBottom: 5,
                                }}>First Name</Text>
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
                                        placeholder='Enter your First name'
                                        placeholderTextColor={'gray'}
                                        keyboardType='default'
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
                                }}>Last Name</Text>
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
                                        placeholder='Enter your last name'
                                        placeholderTextColor={'gray'}
                                        keyboardType='default'
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
                            <TouchableOpacity style={{ backgroundColor: 'lightblue', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, paddingVertical: 7 }}>Signup</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.lineText}>
                            <View style={styles.line} />
                            <Text style={styles.text}>or</Text>
                            <View style={styles.line} />
                        </View>
                        <View style={styles.linkContainer}>
                            <Text style={styles.linkText}>If you alredy have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkbutton}>
                                <Text style={styles.link}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Signup

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