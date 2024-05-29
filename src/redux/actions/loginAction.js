// actions/userActions.js
import { SigninWithGoogle } from "../../config/firebase/GoogleSignin";

export const loginRequest = () => ({
    type: 'LOGIN_REQUEST',
});

export const loginSuccess = (userInfo) => ({
    type: 'LOGIN_SUCCESS',
    payload: userInfo,
});

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});

export const loginWithGoogle = () => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const userInfo = await SigninWithGoogle();
        dispatch(loginSuccess(userInfo));
        console.log(userInfo)
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const logout = () => ({
    type: 'LOGOUT',
});
