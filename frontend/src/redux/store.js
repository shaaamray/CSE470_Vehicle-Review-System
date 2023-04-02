import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import {persistStore, persistReducer, FLUSH, REHYDRATE, PERSIST, PAUSE, REGISTER, PURGE} from "redux-persist";
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const authPersist = persistReducer(persistConfig, userSlice)

export const store = configureStore({
    reducer:{
        user:authPersist
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH, REHYDRATE, PERSIST, PURGE, PAUSE, REGISTER]
        }
    })
})

export let persistor = persistStore(store)