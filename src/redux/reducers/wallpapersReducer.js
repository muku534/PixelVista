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

        case 'FETCH_WALLPAPERS_SUCCESS': {
            const { isSearch, photos } = action.payload;

            // Use a Map to deduplicate by `id`
            const wallpapers = isSearch
                ? photos // Replace with new results for a search
                : Array.from(
                    new Map(
                        [...state.wallpapers, ...photos].map((item) => [item.id, item])
                    ).values()
                );

            return {
                ...state,
                loading: false,
                wallpapers,
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
