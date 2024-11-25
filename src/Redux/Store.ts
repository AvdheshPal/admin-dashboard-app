import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/authSlice';
import formReducer from './features/formSlice';
import stepperReducer from './features/stepperSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    stepper : stepperReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth',"form", 'stepper'],
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
