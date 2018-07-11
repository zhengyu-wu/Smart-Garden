import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
import createLogger from 'redux-logger';
import api from '../middlewares/api'

const logger = createLogger()



const store = createStore(
    reducer,
    compose(
        applyMiddleware(api, logger)
    )
);


export default store