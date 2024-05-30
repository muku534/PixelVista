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
        // case 'FETCH_WALLPAPERS_SUCCESS':
        //     return {
        //         ...state,
        //         loading: false,
        //         wallpapers: [...state.wallpapers, ...action.payload],
        //     };
        case 'FETCH_WALLPAPERS_SUCCESS':
            if (action.payload.isSearch) {
                // Replace existing wallpapers with new ones for search
                return {
                    ...state,
                    loading: false,
                    wallpapers: action.payload.photos,
                };
            } else {
                // Concatenate new wallpapers with existing ones for pagination
                return {
                    ...state,
                    loading: false,
                    wallpapers: [...state.wallpapers, ...action.payload.photos],
                };
            }
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
