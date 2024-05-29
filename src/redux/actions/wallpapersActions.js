export const fetchWallpapers = (page) => async (dispatch) => {
    dispatch({ type: 'FETCH_WALLPAPERS_REQUEST' });

    try {
        const response = await fetch(`https://api.pexels.com/v1/curated?per_page=80&page=${page}`, {
            headers: {
                Authorization: process.env.AUTHORIZATION,
            },
        });
        const data = await response.json();
        dispatch({ type: 'FETCH_WALLPAPERS_SUCCESS', payload: data.photos });
    } catch (error) {
        dispatch({ type: 'FETCH_WALLPAPERS_FAILURE', payload: error.message });
    }
};
