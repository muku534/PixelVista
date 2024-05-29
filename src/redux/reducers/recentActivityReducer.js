// reducers/recentReducer.js
import { ADD_RECENT_ACTIVITY } from "../actions/recentActivityAction";

const initialState = {
    recentActivities: [],
};

const recentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RECENT_ACTIVITY:
            return {
                ...state,
                recentActivities: [action.payload, ...state.recentActivities].slice(0, 10), // Keep only the last 10 activities
            };
        default:
            return state;
    }
};

export default recentReducer;
