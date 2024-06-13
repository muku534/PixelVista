import auth from '@react-native-firebase/auth';

export const EmailSignup = async ({ email, password }) => {
    try {
        await auth().createUserWithEmailAndPassword(email, password);
        console.log('User account created & signed in!');
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        } else {
            console.error(error);
        }
    }
};

export const EmailSignin = async ({ email, password }) => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
        // const user = auth().currentUser; // Retrieve the current signed-in user
        console.log('User Signed in!',);
        // return user; // Return the user data
        // console.log('User Signed in!');
    } catch (error) {
        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        } else {
            console.error(error);
        }
    }
};
