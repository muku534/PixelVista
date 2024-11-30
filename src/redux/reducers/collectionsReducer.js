const initialState = {
    collections: [], // Stores the collections
    loading: false,  // Tracks loading state
    error: null,     // Tracks errors
};

const collectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_COLLECTIONS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };

        case 'FETCH_COLLECTIONS_SUCCESS': {
            const { isSearch, data } = action.payload;

            // Deduplicate by `id` using a Map
            const collections = isSearch
                ? data
                : Array.from(
                    new Map(
                        [...state.collections, ...data].map((item) => [item.id, item])
                    ).values()
                );

            return {
                ...state,
                loading: false,
                collections,
            };
        }

        case 'FETCH_COLLECTIONS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default collectionsReducer;
