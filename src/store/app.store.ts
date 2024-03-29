import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
