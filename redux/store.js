import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from './features/authSlice';
import hostnameSlice from './features/hostnameSlice';
import inboxSlice from './features/inboxSlice';
import grantSlice from './features/grantSlice';
import { globalReducer } from './features/globalReducer';
import calenderSlice from './features/calenderSlice';

//config data for persistent data
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ["auth", "inbox", "hostname", "grants", "calender"],

};

//combining all reducers where data needs to be persisted
const rootReducer = combineReducers({
    hostname: hostnameSlice,
    auth: authSlice,
    inbox: inboxSlice,
    grants: grantSlice,
    global: globalReducer,
    calender: calenderSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }),
});

//export persistor
export const persistor = persistStore(store)
