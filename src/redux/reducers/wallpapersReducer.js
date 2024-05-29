const initialState = {
    wallpapers: [],
    loading: false,
    error: null,
};

const wallpapersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WALLPAPERS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_WALLPAPERS_SUCCESS':
            return {
                ...state,
                loading: false,
                wallpapers: [...state.wallpapers, ...action.payload],
            };
        case 'FETCH_WALLPAPERS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default wallpapersReducer;
