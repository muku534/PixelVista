export const fetchCollection = (query, page, isSearch) => async (dispatch) => {
    dispatch({ type: "FETCH_COLLECTIONS_REQUEST" });
    try {
        const response = await fetch(`https://api.pexels.com/v1/collections/featured?per_page=10&page=${page}`, {
            headers: {
                Authorization: process.env.AUTHORIZATION,
            },
        });
        const data = await response.json();
        // console.log(data.collections)
        dispatch({ type: 'FETCH_COLLECTIONS_SUCCESS', payload: { isSearch: false, data: data.collections }, });
    } catch (error) {
        dispatch({ type: 'FETCH_COLLECTIONS_FAILURE', payload: error.message });
    }
};
