// actions/recentActions.js
export const ADD_RECENT_ACTIVITY = 'ADD_RECENT_ACTIVITY';

export const addRecentActivity = (image) => ({
    type: ADD_RECENT_ACTIVITY,
    payload: image,
});
