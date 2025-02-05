import { API_URL } from "../config";
import axios from 'axios';
import initialState from "./initialState";

/* SELECTORS */
export const getAds = ({ advertisements }) => advertisements.data;
export const getAdById = ({ advertisements }, id) => advertisements.data.find(ad => ad._id === id);
export const getAdSearched = ({ advertisements }, searchPhrase) => advertisements.data.filter(ad => ad.title.toLowerCase().includes(searchPhrase.toLowerCase()) || ad.location.toLowerCase().includes(searchPhrase.toLowerCase()) );

/* ACTIONS */
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;
const LOAD_ADS = createActionName('LOAD_ADS');
const START_REQUEST = createActionName('START_REQUEST');

// Action name creator
export const loadAds = payload => ({ type: LOAD_ADS, payload });
export const startRequest = () => ({ type: START_REQUEST });

export const loadAdsRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/api/ads`);
            dispatch(loadAds(res.data));
        } catch (err) {
            console.log(err.message);
        }
    }
}

//API Req
// export const fetchAds = () => {
//     return (dispatch) => {
//         fetch(`${API_URL}/api/ads`)
//             .then(res => res.json())
//             .then(advertisements => dispatch(loadAds(advertisements)));
//     };
//   };

//Reducer
const adsReducer = (statePart = initialState.advertisements, action) => {
    switch (action.type) {
        case START_REQUEST:
            return { ...statePart, loading: true };
        case LOAD_ADS: 
            return { data: [...action.payload], loading: false };
        default:
            return statePart;
    };   
};

export default adsReducer;