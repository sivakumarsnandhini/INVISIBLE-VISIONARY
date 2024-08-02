import { combineReducers } from 'redux'
import Alanreducer from './Alanreducer'
import User_credentails from './user_credentials'

const reducer = combineReducers({
    alanreducer: Alanreducer,
    User_credentails: User_credentails
})

export default reducer