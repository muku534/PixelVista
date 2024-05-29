import { combineReducers } from 'redux';
import wallpapersReducer from './wallpapersReducer';
import userReducer from './userReducer';
import recentReducer from './recentActivityReducer';

const rootReducer = combineReducers({
    wallpapers: wallpapersReducer,
    user: userReducer,
    recent: recentReducer,
});

export default rootReducer;
