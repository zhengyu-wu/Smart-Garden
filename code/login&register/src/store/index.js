import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
import createLogger from 'redux-logger';
import api from '../middlewares/api'

const logger = createLogger()

const enhancer = compose(
    applyMiddleware(api, logger)
)

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // ...閿欒澶勭悊
    }
};
store = createStore(reducer, {}, enhancer)

store.subscribe(() => {
    const state = store.getState();
    saveState(state);
})

const loadState = () => {
    try { // 涔熷彲浠ュ閿欎竴涓嬩笉鏀寔localStorage鐨勬儏鍐典笅锛岀敤鍏朵粬鏈湴瀛樺偍
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        } else {
            return JSON.parse(serializedState);
        }
    } catch (err) {
        // ... 閿欒澶勭悊
        return undefined;
    }
}

let store = createStore(reducer, loadState())

export default store