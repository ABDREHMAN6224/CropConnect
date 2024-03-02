import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Defaults to localStorage for web

import authReducers from './auth/auth'
import userReducers from './user/user'
import chatReducers from './chat/chat'

const persistConfig = {
    key: 'root', // Key for storing data in storage
    storage // Storage engine (localStorage or sessionStorage)
    // Add any blacklist or whitelist configuration here if needed
}
const reducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    chat: chatReducers,
})
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    // reducer:reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
})

export const persistor = persistStore(store)