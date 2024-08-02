import { createStore } from 'redux'
import reducer from './Reducer'

const store = createStore(reducer)
const persister = 'Free';

export { store, persister }