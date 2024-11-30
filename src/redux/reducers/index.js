import { combineReducers } from 'redux';
import wallpapersReducer from './wallpapersReducer';
import userReducer from './userReducer';
import recentReducer from './recentActivityReducer';
import collectionsReducer from './collectionsReducer';

const rootReducer = combineReducers({
    wallpapers: wallpapersReducer,
    user: userReducer,
    recent: recentReducer,
    collections: collectionsReducer,
});

export default rootReducer;
