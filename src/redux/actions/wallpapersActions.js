export const fetchWallpapers = (query, page, isSearch) => async (dispatch) => {
    dispatch({ type: 'FETCH_WALLPAPERS_REQUEST' });
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=50&page=${page}`, {
            headers: {
                Authorization: 'QXMTh7DwFambKiqqnhj2PkyROns0cCWkXruMC5Diw95DsmdSBCDlqjEB',
            },
        });
        const data = await response.json();
        console.log(query, data, isSearch)
        dispatch({ type: 'FETCH_WALLPAPERS_SUCCESS', payload: { photos: data.photos, isSearch } });
    } catch (error) {
        dispatch({ type: 'FETCH_WALLPAPERS_FAILURE', payload: error.message });
    }
};



// export const fetchWallpapers = (page) => async (dispatch) => {
//     dispatch({ type: 'FETCH_WALLPAPERS_REQUEST' });

//     try {
//         const response = await fetch(`https://api.pexels.com/v1/curated?per_page=80&page=${page}`, {
//             headers: {
//                 Authorization: process.env.AUTHORIZATION,
//             },
//         });
//         const data = await response.json();
//         dispatch({ type: 'FETCH_WALLPAPERS_SUCCESS', payload: data.photos });
//     } catch (error) {
//         dispatch({ type: 'FETCH_WALLPAPERS_FAILURE', payload: error.message });
//     }
// };
