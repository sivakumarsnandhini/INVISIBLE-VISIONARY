import * as actionTypes from './action';

export const initialState = {
    alaninstance: '',
    page: '/',
    search_value:''
};

// ==============================|| OWN REDUCER ||============================== //

const alanreducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALANINSTANCE:
            if (action.click === 'alaninstance') {
                return {
                    ...state,
                    alaninstance: action.data
                };
            } else if (action.click === 'page') {
                return {
                    ...state,
                    page: action.page
                };
            }else if (action.click === 'search_value') {
                return {
                    ...state,
                    search_value: action.search_value
                };
            }
        default:
            return state;
    }
};

export default alanreducer;