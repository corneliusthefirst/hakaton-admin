import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-community/async-storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import exceldataReducer from "../features/data/exceldataSlice";
import chardataReducer from "../features/data/chartdataSlice";
import reportdataReducer from "../features/data/reportdataSlice";

const reducers = combineReducers({
  chartdata: chardataReducer,
  exceldata: exceldataReducer,
  reportdata: reportdataReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
