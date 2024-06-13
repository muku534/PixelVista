// actions/userActions.js
import { EmailSignin, EmailSignup } from "../../config/firebase/EmailSignin";
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

// New action creators for email/password authentication
export const emailSignup = ({ email, password }) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        // Call the email signup function
        await EmailSignup({ email, password });
        dispatch(loginSuccess({ email, password })); // Assuming email and password are part of user info
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const emailSignin = ({ email, password }) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        // Call the email signin function
        await EmailSignin({ email, password });
        dispatch(loginSuccess({ email, password })); // Assuming email and password are part of user info
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const logout = () => ({
    type: 'LOGOUT',
});
