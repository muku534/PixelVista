export const fetchWallpapers = (query, page, isSearch) => async (dispatch) => {
    dispatch({ type: 'FETCH_WALLPAPERS_REQUEST' });
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=50&page=${page}`, {
            headers: {
                Authorization: process.env.AUTHORIZATION,
            },
        });
        const data = await response.json();
        // console.log(query, data, isSearch)
        dispatch({ type: 'FETCH_WALLPAPERS_SUCCESS', payload: { photos: data.photos, isSearch } });
    } catch (error) {
        dispatch({ type: 'FETCH_WALLPAPERS_FAILURE', payload: error.message });
    }
};

export const TOGGLE_LIKE = 'TOGGLE_LIKE';

export const toggleLike = (id) => async (dispatch, getState) => {
    // Optimistic update: Toggle the like state in Redux
    dispatch({
        type: TOGGLE_LIKE,
        payload: id,
    });

    try {
        // Simulate backend API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // If needed, dispatch a success action here (optional)
        console.log(`Like status for ID ${id} synced successfully with backend.`);
    } catch (error) {
        console.error(`Failed to sync like status for ID ${id}:`, error);

        // Rollback in case of an error
        dispatch({
            type: TOGGLE_LIKE, // Revert the like state in Redux
            payload: id,
        });
    }
};
