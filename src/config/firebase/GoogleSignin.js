import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const SigninWithGoogle = async () => {
    try {
        GoogleSignin.configure({
            offlineAccess: false,
            webClientId: '',
            scopes: ['profile', 'email']
        });

        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        const { idToken } = userInfo;
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);

        const { uid } = userCredential.user;

        // Reference to the user's document
        const userDocRef = firestore().collection('users').doc(uid);

        // Data to be stored in Firestore
        const userData = {
            name: userInfo.user.name,
            email: userInfo.user.email,
            photoUrl: userInfo.user.photo,
            lastSignIn: firestore.FieldValue.serverTimestamp()
        };

        // Create or update the user's document
        await userDocRef.set(userData, { merge: true });

        return userInfo;

    } catch (error) {
        console.log("=> Google Sign In", error);
        return null;
    }
};
