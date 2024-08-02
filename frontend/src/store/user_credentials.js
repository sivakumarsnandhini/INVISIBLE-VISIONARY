import * as actionTypes from './action';

export const initialState = {
    user_name: '',
    mail: '',
    password: '',
    type: '',
    page: '',
    current: '',
    cart:'',
    wishlist:'',
    start:'',
    address:'',
    review:'',
    full_current:''
};

// ==============================|| OWN REDUCER ||============================== //

const alanreducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_CREDENTAILS:
            if (action.click === 'user_name') {
                return {
                    ...state,
                    user_name: action.user_name
                };
            } else if (action.click === 'password') {
                return {
                    ...state,
                    password: action.password
                };
            } else if (action.click === 'mail') {
                return {
                    ...state,
                    mail: action.mail
                };
            } else if (action.click === 'type') {
                return {
                    ...state,
                    type: action.val
                };
            } else if (action.click === 'page') {
                return {
                    ...state,
                    page: action.page
                };
            } else if (action.click === 'address') {
                console.log(action.address);
                return {
                    ...state,
                    address: action.address
                };
            }else if (action.click === 'current') {
                return {
                    ...state,
                    current: action.current
                };
            }else if (action.click === 'cart') {
                return {
                    ...state,
                    cart: action.cart
                };
            }else if (action.click === 'wishlist') {
                return {
                    ...state,
                    wishlist: action.wishlist
                };
            }else if (action.click === 'full_current') {
                return {
                    ...state,
                    full_current: action.full_current
                };
            }else if (action.click === 'start') {
                return {
                    ...state,
                    start: action.start
                };
            }else if (action.click === 'review') {
                return {
                    ...state,
                    review: action.review
                };
            }
        default:
            return state;
    }
};

export default alanreducer;