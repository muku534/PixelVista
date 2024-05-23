import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export const SigninWithGoogle = async () => {
    try {
        GoogleSignin.configure({
            offlineAccess: false,
            webClientId: '634709718614-cdkr6snrqb4a35t1kj8vesv2lvrl63ne.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        });

        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        const { idToken } = userInfo;
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredential);

        return userInfo;

    } catch (error) {
        console.log("=> Google Sign In", error);
        return null;
    }
};
